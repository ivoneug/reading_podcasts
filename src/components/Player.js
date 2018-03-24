import React, { Component } from 'react';
import { View, Text, Image, Slider, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    Player as ToolkitPlayer,
    MediaStates
} from 'react-native-audio-toolkit';
import * as Animatable from 'react-native-animatable';
import LocalizedStrings from 'react-native-localization';
import { Spinner } from './common';
import { podcastPlayCompleted, podcastPlayUncompleted } from '../actions';

class Player extends Component {
    state = {
        showPlayButton: false,
        isPlayerReady: false
    };

    componentDidMount() {
        this.update = this.update.bind(this);

        this.interval = setInterval(this.update, 1000);

        this.player = new ToolkitPlayer(this.props.item.url, {
            autoDestroy: false,
            continuesToPlayInBackground: true
        }).play();
    }

    componentWillReceiveProps(nextProps) {
        const { isDone, rightButtonPressed } = nextProps;
        if (!rightButtonPressed) return;

        if (isDone) {
            this.clearCompleted();
        } else {
            this.markAsCompleted();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.player.destroy();
    }

    onChangeStatus(state) {
        if (this.player.state === MediaStates.ERROR
            || this.player.duration === 0) {
            return;
        }

        switch (state) {
            case MediaStates.PLAYING:
                this.setState({ showPlayButton: false });
                break;

            case MediaStates.PAUSED:
            case MediaStates.DESTROYED:
                this.setState({ showPlayButton: true });
                break;

            default:
        }
    }

    onPlayerButtonPress() {
        if (this.player.state === MediaStates.ERROR
            || this.player.duration === 0) {
            return;
        }

        if (this.state.showPlayButton) {
            if (this.player.canPlay) {
                this.player.play(this.onChangeStatus(MediaStates.PLAYING));
            }

            return;
        }

        if (this.player.canStop) {
            this.player.pause(this.onChangeStatus(MediaStates.PAUSED));
        }
    }

    onPlayerValueChange() {
        this.shouldNotUpdateSlider = true;
    }

    onPlayerValueChangeComplete(value) {
        if (!this.player.canPlay) {
            return;
        }

        let currentTime = value / 100.0;
        currentTime *= this.player.duration;

        this.player.seek(currentTime);
        this.shouldNotUpdateSlider = false;
    }

    playerSeekShift(valueInSec) {
        if (!this.player.canPlay) {
            return;
        }

        const value = valueInSec * 1000.0;
        const currentTime = this.player.currentTime;
        const duration = this.player.duration;

        let seekValue = currentTime + value;
        if (seekValue > duration) {
            seekValue = duration - 1000.0;
        }
        if (seekValue < 0) {
            seekValue = 0;
        }

        this.player.seek(seekValue);
        this.updateSliderValue(seekValue, true);
    }

    markAsCompleted() {
        // mark podcast as completed
        this.props.podcastPlayCompleted(this.props.item.id);

        Actions.refresh({ isDone: true, rightButtonPressed: false });
    }

    clearCompleted() {
        // clear podcast completeion mark
        this.props.podcastPlayUncompleted(this.props.item.id);

        Actions.refresh({ isDone: false, rightButtonPressed: false });
    }

    update() {
        if (!this.player.canPlay) {
            return;
        }
        if (this.player.isStopped && !this.state.showPlayButton) {
            this.onChangeStatus(MediaStates.PAUSED);
            this.markAsCompleted();
        }
        if (!this.state.isPlayerReady
            && this.player && this.player.duration > 0) {
            this.setState({ isPlayerReady: true });
        }

        this.updateSliderValue(this.player.currentTime);
    }

    updateSliderValue(currentTime, force) {
        if (force) {
            this.shouldNotUpdateSlider = false;
        }

        let sliderValue = currentTime * 100.0;
        sliderValue /= this.player.duration;

        if (this.slider && !this.shouldNotUpdateSlider) {
            this.slider.setNativeProps({ value: sliderValue });
        }
    }

    renderPlayer() {
        const {
            playerContainerStyle,
            playerInnerContainerStyle,
            seekbarStyle,
            buttonsContainerStyle,
            buttonStyle,
            secondaryButtonStyle,
            secondaryTextStyle,
            secondaryLeftContainerStyle,
            secondaryRightContainerStyle
        } = playerStyles;

        const playImage = require('../images/play.png');
        const pauseImage = require('../images/pause.png');
        const buttonImage = this.state.showPlayButton ? playImage : pauseImage;

        const containerStyle = [playerInnerContainerStyle];
        if (!this.state.isPlayerReady) {
            containerStyle.push({ opacity: 0 });
        }

        return (
            <Animatable.View
                animation='fadeIn'
                delay={400}
                useNativeDriver
                style={playerContainerStyle}
            >
                <View style={containerStyle}>
                    <Slider
                        ref={slider => { this.slider = slider; }}
                        style={seekbarStyle}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor='#C9E3FF'
                        thumbTintColor='#C9E3FF'
                        thumbImage={require('../images/slider-thumb.png')}
                        onValueChange={this.onPlayerValueChange.bind(this)}
                        onSlidingComplete={this.onPlayerValueChangeComplete.bind(this)}
                    />
                    <View style={buttonsContainerStyle}>
                        <TouchableOpacity
                            style={secondaryLeftContainerStyle}
                            onPress={() => {
                                this.playerSeekShift(-15);
                            }}
                        >
                            <Image
                                style={secondaryButtonStyle}
                                source={require('../images/step-backward.png')}
                            />
                            <Text style={secondaryTextStyle}>{strings.back15Sec}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.onPlayerButtonPress.bind(this)}
                        >
                            <Image
                                style={buttonStyle}
                                source={buttonImage}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={secondaryRightContainerStyle}
                            onPress={() => {
                                this.playerSeekShift(15);
                            }}
                        >
                            <Image
                                style={secondaryButtonStyle}
                                source={require('../images/step-forward.png')}
                            />
                            <Text style={secondaryTextStyle}>{strings.forward15Sec}</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <Spinner
                    backgroundColor='white'
                    color='#C9E3FF'
                    visible={!this.state.isPlayerReady}
                />
            </Animatable.View>
        );
    }

    render() {
        const {
            title,
            author,
            description,
            duration,
            date
        } = this.props.item;
        const {
            containerStyle,
            titleStyle,
            authorStyle,
            descriptionStyle,
            footerTextStyle,
            topContainerStyle,
            middleContainerStyle,
            footerContainerStyle
        } = styles;

        const durationText = `${strings.duration}: ${duration}`;
        const releaseDateText = `${strings.releaseDate}: ${(new Date(date)).toLocaleDateString()}`;

        return (
            <View style={containerStyle}>
                <Animatable.View
                    animation='fadeIn'
                    delay={200}
                    useNativeDriver
                    style={topContainerStyle}
                >
                    <Text style={titleStyle}>{title}</Text>
                    <Text style={authorStyle}>{author}</Text>
                </Animatable.View>

                <Animatable.View
                    animation='fadeIn'
                    delay={300}
                    useNativeDriver
                    style={middleContainerStyle}
                >
                    <Text style={descriptionStyle}>{description}</Text>
                </Animatable.View>

                {this.renderPlayer()}

                <Animatable.View
                    animation='fadeIn'
                    delay={500}
                    useNativeDriver
                    style={footerContainerStyle}
                >
                    <Text style={footerTextStyle}>{releaseDateText}</Text>
                    <Text style={footerTextStyle}>{durationText}</Text>
                </Animatable.View>
            </View>
        );
    }
}

const playerStyles = {
    playerContainerStyle: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20
    },
    playerInnerContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    seekbarStyle: {
        width: 280
    },
    buttonsContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    buttonStyle: {
        width: 85,
        height: 85
    },
    secondaryLeftContainerStyle: {
        marginTop: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    secondaryRightContainerStyle: {
        marginTop: 10,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    secondaryTextStyle: {
        fontSize: 10,
        lineHeight: 10
    },
    secondaryButtonStyle: {
        width: 40,
        height: 40
    }
};

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    topContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    middleContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerContainerStyle: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleStyle: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 15
    },
    authorStyle: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5
    },
    descriptionStyle: {
        fontSize: 12,
        textAlign: 'left'
    },
    footerTextStyle: {
        fontSize: 12,
        marginTop: 5
    }
};

const strings = new LocalizedStrings({
    en: {
        duration: 'duration',
        releaseDate: 'release date',
        completed: 'COMPLETED',
        back15Sec: '-15 sec',
        forward15Sec: '+15 sec'
    },
    ru: {
        duration: 'продолжительность',
        releaseDate: 'дата выхода',
        completed: 'ПРОСЛУШАНО',
        back15Sec: '-15 сек',
        forward15Sec: '+15 сек'
    }
});

export default connect(null, {
    podcastPlayCompleted, podcastPlayUncompleted
})(Player);

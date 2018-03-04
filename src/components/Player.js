import React, { Component } from 'react';
import { View, Text, Image, Slider, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
    Player as ToolkitPlayer,
    MediaStates
} from 'react-native-audio-toolkit';
import * as Animatable from 'react-native-animatable';
import LocalizedStrings from 'react-native-localization';
import { podcastPlayCompleted } from '../actions';

class Player extends Component {
    state = { showPlayButton: false };

    componentDidMount() {
        this.update = this.update.bind(this);

        this.interval = setInterval(this.update, 1000);

        this.player = new ToolkitPlayer(this.props.item.url, {
            autoDestroy: false,
            continuesToPlayInBackground: true
        }).play();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.player.destroy();
    }

    onChangeStatus(state) {
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

        // TrackPlayer.seekTo(currentTime);
        this.player.seek(currentTime);
        this.shouldNotUpdateSlider = false;
    }

    update() {
        if (!this.player.canPlay) {
            return;
        }
        if (this.player.isStopped) {
            this.onChangeStatus(MediaStates.PAUSED);
        }

        let sliderValue = this.player.currentTime * 100.0;
        sliderValue /= this.player.duration;

        if (this.slider && !this.shouldNotUpdateSlider) {
            this.slider.setNativeProps({ value: sliderValue });
        }

        if (sliderValue > 95) {
            // mark podcast as completed
            this.props.podcastPlayCompleted(this.props.item.id);
        }
    }

    renderPlayer() {
        const {
            playerContainerStyle,
            seekbarStyle,
            buttonStyle
        } = playerStyles;

        const playImage = require('../images/play.png');
        const pauseImage = require('../images/pause.png');
        const buttonImage = this.state.showPlayButton ? playImage : pauseImage;

        return (
            <Animatable.View
                animation='fadeIn'
                delay={400}
                useNativeDriver
                style={playerContainerStyle}
            >
                <Slider
                    ref={slider => { this.slider = slider; }}
                    style={seekbarStyle}
                    step={1}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor='#C9E3FF'
                    thumbTintColor='#C9E3FF'
                    onValueChange={this.onPlayerValueChange.bind(this)}
                    onSlidingComplete={this.onPlayerValueChangeComplete.bind(this)}
                />
                <TouchableOpacity
                    onPress={this.onPlayerButtonPress.bind(this)}
                >
                    <Image
                        style={buttonStyle}
                        source={buttonImage}
                    />
                </TouchableOpacity>
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
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    seekbarStyle: {
        width: 300
    },
    buttonStyle: {
        width: 85,
        height: 85,
        marginTop: 10
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
        fontSize: 14,
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
        completed: 'COMPLETED'
    },
    ru: {
        duration: 'продолжительность',
        releaseDate: 'дата выхода',
        completed: 'ПРОСЛУШАНО'
    }
});

export default connect(null, { podcastPlayCompleted })(Player);

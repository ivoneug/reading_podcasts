import React, { Component } from 'react';
import { View, Text, Image, Slider, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AudioController } from 'react-native-hue-player';
import * as Animatable from 'react-native-animatable';
import { podcastPlayCompleted } from '../actions';

class Player extends Component {
    state = { showPlayButton: false };

    componentWillMount() {
        const audio = {
            key: this.props.item.id,
            title: this.props.item.title,
            url: this.props.item.url
        };
        AudioController.init(
            [audio], 0,
            this.onChangeStatus.bind(this),
            this.updateCurrentTime.bind(this));
    }

    componentDidMount() {
        AudioController.play();
    }

    componentWillUnmount() {
        AudioController.pause();
    }

    onChangeStatus(status) {
        switch (status) {
            case AudioController.status.PLAYING:
                this.setState({ showPlayButton: false });
                break;

            case AudioController.status.PAUSED:
            case AudioController.status.STOPPED:
                this.setState({ showPlayButton: true });
                break;

            default:

        }
    }

    onPlayerButtonPress() {
        if (this.state.showPlayButton) {
            AudioController.play();
        } else {
            AudioController.pause();
        }
    }

    onPlayerValueChange() {
        this.shouldNotUpdateSlider = true;
    }

    onPlayerValueChangeComplete(value) {
        let currentTime = value / 100.0;
        currentTime *= AudioController.currentAudio.duration;

        AudioController.seek(currentTime);
        this.shouldNotUpdateSlider = false;
    }

    updateCurrentTime(currentTime) {
        console.log(currentTime);

        let sliderValue = currentTime * 100.0;
        sliderValue /= AudioController.currentAudio.duration;

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

        const durationText = `duration: ${duration}`;
        const releaseDateText = `release date: ${(new Date(date)).toLocaleDateString()}`;

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

export default connect(null, { podcastPlayCompleted })(Player);

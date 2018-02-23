import React, { Component, Dimensions } from 'react';
import { View, Text, Image, Slider } from 'react-native';
import { connect } from 'react-redux';
import { AudioController } from 'react-native-hue-player';

class Player extends Component {
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
        console.log(status);
    }

    onPlayerValueChange() {
        this.shouldNotUpdateSlider = true;
    }

    onPlayerValueChangeComplete(value) {
        console.log(`VALUE = ${value}`);

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
            bottomContainerStyle,
            footerContainerStyle
        } = styles;
        const {
            seekbarStyle
        } = playerStyles;

        const durationText = `duration: ${duration}`;
        const releaseDateText = `release date: ${(new Date(date)).toLocaleDateString()}`;

        return (
            <View style={containerStyle}>
                <View style={topContainerStyle}>
                    <Text style={titleStyle}>{title}</Text>
                    <Text style={authorStyle}>{author}</Text>
                </View>

                <View style={middleContainerStyle}>
                    <Text style={descriptionStyle}>{description}</Text>
                </View>

                <View style={bottomContainerStyle}>
                    <Slider
                        ref={slider => { this.slider = slider; }}
                        style={seekbarStyle}
                        step={1}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor='#C9E3FF'
                        onValueChange={this.onPlayerValueChange.bind(this)}
                        onSlidingComplete={this.onPlayerValueChangeComplete.bind(this)}
                    />
                </View>

                <View style={footerContainerStyle}>
                    <Text style={footerTextStyle}>{releaseDateText}</Text>
                    <Text style={footerTextStyle}>{durationText}</Text>
                </View>
            </View>
        );
    }
}

const playerStyles = {
    seekbarStyle: {
        width: 300
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
    bottomContainerStyle: {
        flex: 2,
        alignItems: 'stretch',
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

export default connect()(Player);

import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button } from './Button';

class Alert extends Component {
    state = { visible: false };

    componentWillReceiveProps(nextProps) {
        // set opacity to 1 when we try to show alert view
        if (nextProps.visible && this.view) {
            this.view.fadeIn(0).then(() => {
                this.setState({ visible: true });
            });
        }
    }

    onButtonPress() {
        const { onConfirm } = this.props;

        this.view.zoomOut(300).then(() => {
            this.setState({ visible: false });
            if (onConfirm) onConfirm();
        });
    }

    render() {
        const {
            hideStyle,
            rootContainerStyle,
            containerStyle,
            titleStyle,
            descriptionStyle,
            buttonContainerStyle,
            androidButtonContainerStyle
        } = styles;
        const {
            title,
            description,
            buttonText,
            buttonColor
        } = this.props;
        const { visible } = this.state;

        const rootStyle = visible ? rootContainerStyle : [rootContainerStyle, hideStyle];
        let btnContainerStyle = buttonContainerStyle;
        if (Platform.OS === 'android') {
            btnContainerStyle = [buttonContainerStyle, androidButtonContainerStyle];
        }

        return (
            <Animatable.View
                useNativeDriver
                style={rootStyle}
                ref={(view) => { this.view = view; }}
            >
                {visible ? <Animatable.View
                    animation='bounceIn'
                    useNativeDriver
                    style={containerStyle}
                >
                    <Text style={titleStyle}>{title}</Text>
                    <Text style={descriptionStyle}>{description}</Text>
                    <View style={btnContainerStyle}>
                        <Button
                            color={buttonColor}
                            onPress={this.onButtonPress.bind(this)}
                        >{buttonText}</Button>
                    </View>
                </Animatable.View> : null}
            </Animatable.View>
        );
    }
}

const styles = {
    hideStyle: {
        width: 0,
        height: 0
    },
    rootContainerStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerStyle: {
        position: 'relative',
        width: 250,
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(82, 82, 82, 0.5)',
        shadowColor: 'rgb(82, 82, 82)',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.25
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 5
    },
    descriptionStyle: {
        fontSize: 14,
        textAlign: 'center'
    },
    buttonContainerStyle: {
        position: 'relative',
        width: 200,
        height: 40,
        marginBottom: 5
    },
    androidButtonContainerStyle: {
        height: 46
    }
};

export default Alert;

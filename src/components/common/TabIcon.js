import React from 'react';
import { View, Text, Image } from 'react-native';

const TabIcon = (props) => {
    const {
        textStyle,
        textActiveStyle,
        textInactiveStyle,
        containerStyle
    } = styles;

    const textStyles = [
        textStyle,
        (props.focused ? textActiveStyle : textInactiveStyle)
    ];

    const imageSrc = props.focused ? props.tabImageActive : props.tabImage;
    if (!imageSrc) {
        return (
            <View style={containerStyle}>
                <Text style={textStyles}>{props.title}</Text>
            </View>
        );
    }

    return (
        <View style={containerStyle}>
            <Image source={imageSrc} />
            <Text style={textStyles}>{props.title}</Text>
        </View>
    );
};

const styles = {
    textStyle: {
        fontSize: 10,
        textAlign: 'center'
    },
    textActiveStyle: {
        color: 'white'
    },
    textInactiveStyle: {
        color: 'black'
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80
    }
};

export default TabIcon;

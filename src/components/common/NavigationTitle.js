import React from 'react';
import { View, Text, Image, Platform } from 'react-native';

const NavigationTitle = (props) => {
    const { titleText } = props;
    const { containerStyle, textStyleIOS, textStyleAndroid } = styles;

    const textStyle = Platform.OS === 'android' ? textStyleAndroid : textStyleIOS;

    return (
        <View style={containerStyle}>
            <Image source={require('../../images/sunglasses-black-title.png')} />
            <Text style={textStyle}>{titleText}</Text>
        </View>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    textStyleIOS: {
        fontSize: 17,
        fontWeight: '600',
        marginLeft: 10
    },
    textStyleAndroid: {
        fontSize: 17,
        fontWeight: '400',
        marginLeft: 10,
        color: 'black'
    }
};

export default NavigationTitle;

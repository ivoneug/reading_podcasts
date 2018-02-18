import React from 'react';
import { View, Text, Image } from 'react-native';

const NavigationTitle = (props) => {
    const { titleText } = props;
    const { containerStyle, textStyle } = styles;

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
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 17,
        fontWeight: '600',
        marginLeft: 10
    }
};

export default NavigationTitle;

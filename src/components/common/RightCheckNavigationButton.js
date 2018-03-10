import React from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import LocalizedStrings from 'react-native-localization';

const RightCheckNavigationButton = (props) => {
    const {
        isDone,
        onRight
    } = props;
    const {
        containerStyle,
        textStyleIOS,
        textStyleAndroid,
        imageStyle
    } = styles;

    const textStyle = Platform.OS === 'android' ? textStyleAndroid : textStyleIOS;
    const checkImage = isDone ? require('../../images/checkbox-marked.png') : require('../../images/checkbox-blank-outline.png')

    return (
        <TouchableOpacity
            style={containerStyle}
            onPress={onRight}
        >
            <Text style={textStyle}>{strings.title}</Text>
            <Image
                style={imageStyle}
                source={checkImage}
            />
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyleIOS: {
        fontSize: 16,
        fontWeight: '400',
        marginRight: 5
    },
    textStyleAndroid: {
        fontSize: 16,
        fontWeight: '400',
        marginRight: 5,
        color: 'black'
    },
    imageStyle: {
        width: 20,
        height: 20,
        marginRight: 10
    }
};

const strings = new LocalizedStrings({
    en: {
        title: 'Done'
    },
    ru: {
        title: 'Готово'
    }
});

export default RightCheckNavigationButton;

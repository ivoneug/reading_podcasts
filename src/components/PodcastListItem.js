import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import LocalizedStrings from 'react-native-localization';

class PodcastListItem extends Component {
    render() {
        const {
            title,
            author,
            duration,
            date
        } = this.props.item;
        const {
            containerStyle,
            textContainer,
            titleStyle,
            authorStyle,
            textStyle,
            footerContainer,
            imageStyle,
            isDoneStyle,
            doneTextStyle
        } = styles;

        const durationText = `${strings.duration}: ${duration}`;
        const releaseDateText = `${strings.releaseDate}: ${(new Date(date)).toLocaleDateString()}`;

        const containerStyles = [containerStyle];
        if (this.props.isDone) {
            containerStyles.push(isDoneStyle);
        }

        const renderFooter = () => {
            if (this.props.isDone) {
                return (
                    <View style={footerContainer}>
                        <Text style={doneTextStyle}>{strings.completed}</Text>
                    </View>
                );
            }

            return (
                <View style={footerContainer}>
                    <Text style={textStyle}>{durationText}</Text>
                    <Text style={textStyle}>{releaseDateText}</Text>
                </View>
            );
        };

        return (
            <TouchableWithoutFeedback onPress={this.props.onItemPress}>
                <View style={containerStyles}>
                    <View style={textContainer}>
                        <Text style={titleStyle}>{title}</Text>
                        <Text style={authorStyle}>{author}</Text>
                        {renderFooter()}
                    </View>
                    <Image style={imageStyle} source={require('../images/chevron-right.png')} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    containerStyle: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white'
    },
    isDoneStyle: {
        backgroundColor: '#C9E3FF',
        borderColor: 'rgba(143, 165, 191, 0.5)'
    },
    textContainer: {
        flex: 1,
        paddingRight: 25
    },
    titleStyle: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    authorStyle: {
        fontSize: 10,
        marginTop: 2
    },
    textStyle: {
        fontSize: 10
    },
    doneTextStyle: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    imageStyle: {
        margin: 15
    }
};

const strings = new LocalizedStrings({
    en: {
        duration: 'duration',
        releaseDate: 'release date',
        completed: 'COMPLETED'
    },
    ru: {
        duration: '??????????????????????????????????',
        releaseDate: '???????? ????????????',
        completed: '????????????????????'
    }
});

export default PodcastListItem;

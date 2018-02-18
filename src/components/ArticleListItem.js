import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, Image } from 'react-native';

class ArticleListItem extends Component {
    render() {
        const { title, author } = this.props.article;
        const {
            containerStyle,
            textContainerStyle,
            titleStyle,
            authorStyle,
            imageStyle
        } = styles;

        return (
            <TouchableWithoutFeedback onPress={this.props.onItemPress}>
                <View style={containerStyle}>
                    <View style={textContainerStyle}>
                        <Text style={titleStyle}>{title}</Text>
                        <Text style={authorStyle}>{author.name}</Text>
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
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row'
    },
    textContainerStyle: {
        flex: 1,
        justifyContent: 'center'
    },
    titleStyle: {
        fontSize: 16
    },
    authorStyle: {
        fontSize: 12
    },
    imageStyle: {
        margin: 15
    }
};

export default ArticleListItem;

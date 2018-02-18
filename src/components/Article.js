import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, Image } from 'react-native';
import { scrollArticle } from '../actions';

const TextItemTypes = {
    TITLE: 0,
    AUTHOR: 1,
    TEXT: 2,
    IMAGE: 3
};

class Article extends Component {
    componentWillMount() {
        this.initDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.initDataSource(nextProps);
    }

    onArticleScroll(event) {
        let position = event.nativeEvent.contentOffset.y;
        if (position < 0) position = 0;

        this.props.scrollArticle(position);
    }

    processItems(article, imageStore) {
        const items = [];

        if (article.image) {
            const image = imageStore.getArticleImage(article.image.filename);
            if (image) {
                items.push({
                    key: items.length,
                    type: TextItemTypes.IMAGE,
                    image
                });
            }
        }

        items.push({
            key: items.length,
            type: TextItemTypes.TITLE,
            text: article.title
        });

        items.push({
            key: items.length,
            type: TextItemTypes.AUTHOR,
            text: article.author.name
        });

        for (const item of article.textItems) {
            items.push({
                key: items.length,
                type: TextItemTypes.TEXT,
                text: item
            });
        }

        if (items.length > 0) {
            items[items.length - 1].final = true;
        }

        return items;
    }

    initDataSource({ article, imageStore, position }) {
        // we have to invoke scrollArticle action that is triggering
        // props receiving each time
        // so we need to determine whether we got
        // props for new article or just new 'position' props
        //
        // no need to recreate an article list when no new article props received
        if (!article) return;
        if (this.currentArticle === article.id) {
            return;
        }

        this.currentArticle = article.id;
        this.startPosition = position;

        this.dataSource = this.processItems(article, imageStore);

        this.scrollListToStartPosition();
    }

    scrollListToStartPosition() {
        if (this.startPosition == null) return;

        this.scrollListTo(this.startPosition);
    }

    scrollListTo(y) {
        if (!this.listView) return;

        this.listView.scrollToOffset({
            offset: y,
            animated: false
        });
    }

    renderTextItem({ item }) {
        const {
            titleStyle,
            authorStyle,
            textItemStyle,
            finalItemStyle,
            imageItemStyle
        } = styles;

        if (item.type === TextItemTypes.IMAGE) {
            return (
                <Image
                    style={imageItemStyle}
                    resizeMode='contain'
                    source={item.image}
                />
            );
        }

        let style = [titleStyle];
        switch (item.type) {
            case TextItemTypes.TITLE:
                style = [titleStyle];
                break;

            case TextItemTypes.AUTHOR:
                style = [authorStyle];
                break;

            case TextItemTypes.TEXT:
                style = [textItemStyle];
                break;

            default:
        }

        if (item.final) style.push(finalItemStyle);

        return (
            <Text style={style}>{item.text}</Text>
        );
    }

    renderEmptyArticle() {
        const {
            containerStyle,
            emptyContainerStyle,
            titleStyle,
            textItemStyle
        } = styles;

        return (
            <View style={[containerStyle, emptyContainerStyle]}>
                <Text style={titleStyle}>No Article Selected</Text>
                <Text style={textItemStyle}>Select an article and it'll appear here</Text>
            </View>
        );
    }

    render() {
        if (!this.props.article) {
            return this.renderEmptyArticle();
        }

        const { containerStyle } = styles;

        return (
            <FlatList
                style={containerStyle}
                data={this.dataSource}
                renderItem={this.renderTextItem}
                scrollEventThrottle={500}
                onScroll={this.onArticleScroll.bind(this)}
                ref={(listView) => {
                    this.listView = listView;
                }}
                onLayout={this.scrollListToStartPosition.bind(this)}
            />
        );
    }
}

const styles = {
    emptyContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15
    },
    titleStyle: {
        fontSize: 24,
        paddingTop: 10,
        paddingBottom: 0,
        alignSelf: 'center',
        textAlign: 'center'
    },
    authorStyle: {
        fontSize: 12,
        paddingBottom: 15,
        alignSelf: 'center'
    },
    textItemStyle: {
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        // textAlign: 'justify'
    },
    finalItemStyle: {
        paddingBottom: 50
    },
    imageItemStyle: {
        width: null,
        height: 300
    }
};

const mapStateToProps = (state) => {
    const article = state.articles.find((item) => item.id === state.selectedArticle);

    return {
        article,
        position: state.position,
        imageStore: state.imageStore
    };
};

export default connect(mapStateToProps, { scrollArticle })(Article);

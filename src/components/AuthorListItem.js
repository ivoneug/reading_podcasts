import React, { Component } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Text,
    Image,
    FlatList,
    LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { selectArticle, scrollArticle } from '../actions';
import ArticleListItem from './ArticleListItem';

class AuthorListItem extends Component {
    componentWillMount() {
        this.initDataSource(this.props.articles);
    }

    componentWillReceiveProps(nextProps) {
        this.initDataSource(nextProps.articles);
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    initDataSource(articles) {
        this.dataSource = articles;
    }

    renderChevron() {
        const { imageStyle } = styles;

        if (this.props.selected) {
            return <Image style={imageStyle} source={require('../images/chevron-up.png')} />
        }

        return <Image style={imageStyle} source={require('../images/chevron-down.png')} />
    }

    renderRow({ item }) {
        return (
            <ArticleListItem
                onItemPress={() => {
                    this.props.scrollArticle(0);
                    this.props.selectArticle(item);
                    Actions.article();
                }}
                article={item}
            />
        );
    }

    renderArticlesList() {
        return (
            <FlatList
                data={this.dataSource}
                renderItem={this.renderRow.bind(this)}
                keyExtractor={(item) => item.id}
            />
        );
    }

    render() {
        const { name } = this.props.author;
        const {
            containerStyle,
            authorNameStyle
        } = styles;

        return (
            <TouchableWithoutFeedback onPress={this.props.onItemPress}>
                <View
                    onLayout={this.props.onLayout}
                >
                    <View
                        onLayout={this.props.onHeaderLayout}
                        style={containerStyle}
                    >
                        <Text style={authorNameStyle}>{name}</Text>
                        {this.renderChevron()}
                    </View>
                    {this.renderArticlesList()}
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
        borderColor: 'white',
        backgroundColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center'
    },
    authorNameStyle: {
        fontSize: 16,
        flex: 1
    },
    imageStyle: {
        margin: 15
    }
};

const mapStateToProps = (state, ownProps) => {
    const authorId = ownProps.author.id;
    const selected = authorId === state.expandedAuthor;
    const articles = selected ? state.filteredArticles : [];

    return { selected, articles };
};

export default connect(mapStateToProps, { selectArticle, scrollArticle })(AuthorListItem);

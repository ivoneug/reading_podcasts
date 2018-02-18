import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { selectArticle, scrollArticle } from '../actions';
import ArticleListItem from './ArticleListItem';

class ArticleList extends Component {
    componentWillMount() {
        this.dataSource = this.props.articles;
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

    render() {
        const { containerStyle } = styles;

        return (
            <FlatList
                style={containerStyle}
                data={this.dataSource}
                renderItem={this.renderRow.bind(this)}
                keyExtractor={(item) => item.id}
            />
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: 'white'
    }
};

const mapStateToProps = (state) => {
    return { articles: state.articles };
};

export default connect(mapStateToProps, { selectArticle, scrollArticle })(ArticleList);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { selectAuthor } from '../actions';
import AuthorListItem from './AuthorListItem';

class AuthorList extends Component {
    componentWillMount() {
        this.dataSource = this.props.authors;
    }

    renderRow({ item }) {
        return (
            <AuthorListItem
                onItemPress={() => {
                    this.props.selectAuthor(item);

                    const index = this.props.authors.indexOf(item);
                    this.listView.scrollToIndex({ index });
                }}
                author={item}
                onHeaderLayout={(event) => {
                    // returns height of the HEADER
                    const { height } = event.nativeEvent.layout;
                    this.ITEM_HEIGHT = height;
                }}
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
                ref={(listView) => {
                    this.listView = listView;
                }}
                getItemLayout={(data, index) => {
                    const height = this.ITEM_HEIGHT || 0;
                    return {
                        length: height,
                        offset: height * index,
                        index
                    };
                }}
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
    return {
        authors: state.authors.list
    };
};

export default connect(mapStateToProps, { selectAuthor })(AuthorList);

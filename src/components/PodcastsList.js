import React, { Component } from 'react';
import { View, FlatList, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { podcastsListFetch } from '../actions';
import { Spinner } from './common';
import PodcastListItem from './PodcastListItem';

class PodcastsList extends Component {
    componentDidMount() {
        this.props.podcastsListFetch();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        // this.dataSource = nextProps.articles;
        // this.initDataSource(nextProps);
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    renderItem({ item }) {
        const isDone =['https://player.vgtrk.com/audio/mp3/test/567/031.mp3']
            .indexOf(item.id) !== -1;

        return (
            <PodcastListItem
                item={item}
                isDone={isDone}
            />
        );
    }

    render() {
        console.log(this.props);
        const { loaded, podcasts } = this.props;
        const { containerStyle } = styles;

        if (!loaded) {
            return (
                <View style={containerStyle}>
                    <Spinner />
                </View>
            );
        }

        return (
            <FlatList
                style={containerStyle}
                data={podcasts}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
            />
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    spinnerStyle: {
        flex: 1
    }
};

const mapStateToProps = (state) => {
    return {
        loaded: state.podcasts.length > 0,
        podcasts: state.podcasts
    };
};

export default connect(mapStateToProps, { podcastsListFetch })(PodcastsList);

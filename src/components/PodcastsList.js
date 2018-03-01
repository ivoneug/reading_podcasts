import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { podcastsListFetch } from '../actions';
import { Spinner } from './common';
import PodcastListItem from './PodcastListItem';
import About from './About';

class PodcastsList extends Component {
    componentDidMount() {
        this.props.podcastsListFetch();
    }

    componentWillReceiveProps(nextProps) {
        const { loaded } = nextProps;

        if (loaded) {
            this.containerView.fadeIn(300);
        }
    }

    renderItem({ item }) {
        const isDone = this.props.completed.indexOf(item.id) !== -1;

        return (
            <PodcastListItem
                item={item}
                isDone={isDone}
                onItemPress={() => Actions.player({ item })}
            />
        );
    }

    renderAbout() {
        return (
            <About
                visible={this.props.showAbout}
                onBackPress={() => {
                    Actions.refresh({ showAbout: false });
                }}
            />
        );
    }

    render() {
        const {
            loaded,
            podcasts,
            completed
        } = this.props;
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
                <Animatable.View
                    useNativeDriver
                    style={containerStyle}
                    ref={(view) => { this.containerView = view; }}
                >
                    <FlatList
                        style={containerStyle}
                        data={podcasts}
                        extraData={completed}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={(item) => item.id}
                    />
                </Animatable.View>
                {this.renderAbout()}
                <Spinner
                    visible={!loaded}
                    color='#C9E3FF'
                />
            </View>
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
        podcasts: state.podcasts,
        completed: state.completed
    };
};

export default connect(mapStateToProps, { podcastsListFetch })(PodcastsList);

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LocalizedStrings from 'react-native-localization';
import { podcastsListFetch } from '../actions';
import { Spinner, Alert } from './common';
import PodcastListItem from './PodcastListItem';
import About from './About';

class PodcastsList extends Component {
    componentDidMount() {
        this.props.podcastsListFetch();
    }

    componentWillReceiveProps(nextProps) {
        const { loaded } = nextProps;

        if (loaded && loaded !== this.props.loaded) {
            this.containerView.fadeIn(300);
        }
    }

    renderItem({ item }) {
        const isDone = this.props.completed.indexOf(item.id) !== -1;

        return (
            <PodcastListItem
                item={item}
                isDone={isDone}
                onItemPress={() => Actions.player({ item, isDone })}
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
            failed,
            podcasts,
            completed
        } = this.props;
        const {
            containerStyle,
            listContainerStyle,
            listStyle
        } = styles;

        return (
            <View style={containerStyle}>
                <Animatable.View
                    useNativeDriver
                    style={listContainerStyle}
                    ref={(view) => { this.containerView = view; }}
                >
                    <FlatList
                        style={listStyle}
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
                <Alert
                    visible={failed}
                    title={strings.alertTitle}
                    description={strings.alertDescription}
                    buttonText={strings.alertButton}
                    onConfirm={() => {
                        this.props.podcastsListFetch();
                    }}
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    listContainerStyle: {
        flex: 1,
        opacity: 0
    },
    listStyle: {
        flex: 1,
        backgroundColor: '#C9E3FF'
    },
    spinnerStyle: {
        flex: 1
    }
};

const strings = new LocalizedStrings({
    en: {
        alertTitle: 'Unable to load data',
        alertDescription: 'Looks like there is no internet connection at this time.',
        alertButton: 'Try Again'
    },
    ru: {
        alertTitle: 'Не могу загрузить данные',
        alertDescription: 'Похоже, что отсутствует соединение с интернетом',
        alertButton: 'Попробовать еще'
    }
});

const mapStateToProps = (state) => {
    return {
        loaded: state.podcasts.list.length > 0,
        podcasts: state.podcasts.list,
        failed: state.podcasts.failed,
        completed: state.completed
    };
};

export default connect(mapStateToProps, { podcastsListFetch })(PodcastsList);

import React, { Component } from 'react';
import {
    Scene,
    Router,
    Actions
} from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import NavigationTitle from './components/common/NavigationTitle';
import PodcastsList from './components/PodcastsList';
import Player from './components/Player';

class RouterComponent extends Component {
    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 500);
    }

    render() {
        return (
            <Router
                sceneStyle={{ backgroundColor: 'white' }}
            >
                <Scene
                    key='root'
                    activeBackgroundColor='black'
                    inactiveBackgroundColor='white'
                >
                    <Scene
                        initial
                        renderTitle={NavigationTitle}
                        titleText='Reading'

                        rightTitle='About'
                        rightButtonTextStyle={{ color: 'black', paddingLeft: 5 }}
                        onRight={() => Actions.refresh({ showAbout: true })}

                        key='list'
                        component={PodcastsList}
                    />
                    <Scene
                        title='Now Listening'
                        titleStyle={{ color: 'black', alignSelf: 'center' }}

                        backTitle='Back'
                        backButtonTextStyle={{ color: 'black' }}
                        backButtonTintColor='black'

                        key='player'
                        component={Player}
                    />
                </Scene>
            </Router>
        );
    }
}

export default RouterComponent;

import React, { Component } from 'react';
import {
    Scene,
    Router,
    Actions
} from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import LocalizedStrings from 'react-native-localization';
import NavigationTitle from './components/common/NavigationTitle';
import RightCheckNavigationButton from './components/common/RightCheckNavigationButton';
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
                    navigationBarStyle={{ backgroundColor: '#C9E3FF' }}
                >
                    <Scene
                        initial
                        renderTitle={NavigationTitle}
                        titleText={strings.title}

                        rightTitle={strings.about}
                        rightButtonTextStyle={{ color: 'black', paddingLeft: 5 }}
                        onRight={() => Actions.refresh({ showAbout: true })}

                        key='list'
                        component={PodcastsList}
                    />
                    <Scene
                        title={strings.listeningTitle}
                        titleStyle={{
                            color: 'black',
                            alignSelf: 'center',
                            fontWeight: '400'
                        }}

                        backTitle={strings.back}
                        backButtonTextStyle={{ color: 'black' }}
                        backButtonTintColor='black'

                        renderRightButton={RightCheckNavigationButton}
                        onRight={() => Actions.refresh({ rightButtonPressed: true })}

                        key='player'
                        component={Player}
                    />
                </Scene>
            </Router>
        );
    }
}

const strings = new LocalizedStrings({
    en: {
        title: 'Reading',
        about: 'About',
        listeningTitle: 'Now Listening',
        back: 'Back'
    },
    ru: {
        title: 'Чтение',
        about: 'О нас',
        listeningTitle: 'Аудиоплеер',
        back: 'Назад'
    }
});

export default RouterComponent;

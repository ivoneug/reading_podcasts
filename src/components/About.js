import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Modal,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LocalizedStrings from 'react-native-localization';
import { openAppPageInStore } from '../AppStoreInteraction';

const Links = {
    GOOGLE: 'https://plus.google.com/118198258710549956750',
    FACEBOOK: 'https://www.facebook.com/ivoneug',
    LINKEDIN: 'https://www.linkedin.com/in/evgeniy-ivon-4b2883b7/',
    INSTAGRAM: 'https://www.instagram.com/ivoneug/',
    LINKEDIN_VIKTOR: 'https://www.linkedin.com/in/viktor-savelev-66a5b2114/'
};

const { width, height } = Dimensions.get('window');
Animatable.initializeRegistryWithDefinitions({
    slideInUpCustom: {
        from: {
            translateY: height
        },
        to: {
            translateY: 0
        }
    },
    slideOutDownCustom: {
        from: {
            translateY: 0
        },
        to: {
            translateY: height
        }
    }
});

class About extends Component {
    render() {
        const {
            backgroundStyle,
            containerStyle,
            mainContainerStyle,
            headerStyle,
            headerTextStyle,
            normalTextStyle,
            developerContainerStyle,
            testerContainerStyle,
            socialButtonsContainer,
            footerContainerStyle,
            rateShareContainer,
            rateShareButtonStyle,
            rateShareIconStyle,
            backButtonStyle,
            backButtonImageStyle
        } = styles;

        const { onBackPress } = this.props;
        let { visible } = this.props;
        visible = visible || false;

        const onBackPressAction = () => {
            this.contentView.slideOutDownCustom(300)
                .then(() => this.backgroundView.fadeOut(300))
                .then(onBackPress);
        };

        return (
            <Modal
                transparent
                animationType={'none'}
                visible={visible}
                onRequestClose={() => {}}
            >
                <Animatable.View
                    animation='fadeIn'
                    duration={300}
                    useNativeDriver
                    style={backgroundStyle}
                    ref={(view) => { this.backgroundView = view; }}
                />
                <Animatable.View
                    animation='slideInUpCustom'
                    duration={300}
                    useNativeDriver
                    style={containerStyle}
                    ref={(view) => { this.contentView = view; }}
                >
                    <View style={mainContainerStyle}>
                        <Animatable.View
                            animation='bounceIn'
                            delay={400}
                            useNativeDriver
                            style={headerStyle}
                        >
                            <Image source={require('../images/sunglasses-black.png')} />
                            <Text style={headerTextStyle}>{strings.title}</Text>
                        </Animatable.View>
                        <Animatable.View animation='fadeIn' delay={900}>
                            <View style={developerContainerStyle}>
                                <Text style={normalTextStyle}>{strings.developer}</Text>
                                <View style={socialButtonsContainer}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Linking.openURL(Links.GOOGLE);
                                        }}
                                    >
                                        <Image source={require('../images/google-plus-box.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            Linking.openURL(Links.FACEBOOK);
                                        }}
                                    >
                                        <Image source={require('../images/facebook-box.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            Linking.openURL(Links.LINKEDIN);
                                        }}
                                    >
                                        <Image source={require('../images/linkedin.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            Linking.openURL(Links.INSTAGRAM);
                                        }}
                                    >
                                        <Image source={require('../images/instagram.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={testerContainerStyle}>
                                <Text style={normalTextStyle}>{strings.tester}</Text>
                                <View style={socialButtonsContainer}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Linking.openURL(Links.LINKEDIN_VIKTOR);
                                        }}
                                    >
                                        <Image source={require('../images/linkedin.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animatable.View>
                    </View>

                    <Animatable.View
                        animation='fadeIn'
                        delay={1000}
                        useNativeDriver
                        style={footerContainerStyle}
                    >
                        <View style={rateShareContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    openAppPageInStore('id1347074665', 'ru.bibobo.great_short_stories');
                                }}
                            >
                                <View style={rateShareButtonStyle}>
                                    <Text style={normalTextStyle}>{strings.rate}</Text>
                                    <Image style={rateShareIconStyle} source={require('../images/star.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={normalTextStyle}>{strings.dataProvider}</Text>
                        <Text style={normalTextStyle}>{strings.iconProvider}</Text>
                        <Text style={normalTextStyle}>{strings.iconProviderSite}</Text>
                    </Animatable.View>
                    <Animatable.View
                        animation='bounceIn'
                        delay={1500}
                        useNativeDriver
                        style={backButtonStyle}
                    >
                        <TouchableOpacity
                            onPress={onBackPressAction}
                        >
                            <Image
                                style={backButtonImageStyle}
                                source={require('../images/arrow-left.png')}
                            />
                        </TouchableOpacity>
                    </Animatable.View>
                </Animatable.View>
            </Modal>
        );
    }
}

const styles = {
    backgroundStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width,
        height,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
        // backgroundColor: 'rgba(201, 227, 255, 0.75)'
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        margin: 20,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',

    },
    mainContainerStyle: {
        flex: 1,
        justifyContent: 'space-around'
    },
    headerStyle: {
        alignItems: 'center'
    },
    headerTextStyle: {
        fontSize: 35,
        width: 300,
        textAlign: 'center',
        marginTop: 10,
        // fontStyle: 'italic'
    },
    normalTextStyle: {
        fontSize: 14,
        marginTop: 3
    },
    developerContainerStyle: {
        alignItems: 'center',
    },
    testerContainerStyle: {
        alignItems: 'center',
        marginTop: 25
    },
    socialButtonsContainer: {
        width: 140,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    footerContainerStyle: {
        alignItems: 'center',
        height: 130,
        marginTop: 50
    },
    rateShareContainer: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20
    },
    rateShareButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rateShareIconStyle: {
        marginLeft: 5
    },
    backButtonStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButtonImageStyle: {
        width: 35,
        height: 35
    }
};

const strings = new LocalizedStrings({
    en: {
        title: 'Reading',
        developer: 'developed by Evgeniy Ivon',
        tester: 'tested by Viktor Savelev',
        rate: 'Rate this app',
        dataProvider: 'data provided by radiomayak.ru',
        iconProvider: 'main icon made by Yannick',
        iconProviderSite: 'from www.flaticon.com'
    },
    ru: {
        title: 'Чтение',
        developer: 'разработчик Евгений Ивон',
        tester: 'тестирование Виктор Савельев',
        rate: 'Оценить приложение',
        dataProvider: 'данные предоставлены radiomayak.ru',
        iconProvider: 'автор иконки приложения Yannick',
        iconProviderSite: 'www.flaticon.com'
    }
});

export default About;

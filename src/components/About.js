import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';
import { openAppPageInStore } from '../AppStoreInteraction';

const Links = {
    GOOGLE: 'https://plus.google.com/118198258710549956750',
    FACEBOOK: 'https://www.facebook.com/ivoneug',
    LINKEDIN: 'https://www.linkedin.com/in/evgeniy-ivon-4b2883b7/',
    INSTAGRAM: 'https://www.instagram.com/ivoneug/',
    LINKEDIN_VIKTOR: 'https://www.linkedin.com/in/viktor-savelev-66a5b2114/'
};

class About extends Component {
    render() {
        const {
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
            rateShareIconStyle
        } = styles;

        return (
            <View style={containerStyle}>
                <View style={mainContainerStyle}>
                    <View style={headerStyle}>
                        <Image source={require('../images/sunglasses-black.png')} />
                        <Text style={headerTextStyle}>Reading</Text>
                    </View>
                    <View style={developerContainerStyle}>
                        <Text style={normalTextStyle}>developed by Evgeniy Ivon</Text>
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
                        <Text style={normalTextStyle}>tested by Viktor Savelev</Text>
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
                </View>

                <View style={footerContainerStyle}>
                    <View style={rateShareContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                openAppPageInStore('id1347074665', 'ru.bibobo.great_short_stories');
                            }}
                        >
                            <View style={rateShareButtonStyle}>
                                <Text style={normalTextStyle}>Rate this app</Text>
                                <Image style={rateShareIconStyle} source={require('../images/star.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={normalTextStyle}>data provided by radiomayak.ru</Text>
                    <Text style={normalTextStyle}>Main icon made by Yannick from www.flaticon.com</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    mainContainerStyle: {
        flex: 1,
        justifyContent: 'space-around'
    },
    headerStyle: {
        alignItems: 'center',
        marginTop: 20
    },
    headerTextStyle: {
        fontSize: 35,
        width: 300,
        textAlign: 'center',
        marginTop: 10,
        // fontStyle: 'italic'
    },
    normalTextStyle: {
        fontSize: 14
    },
    developerContainerStyle: {
        alignItems: 'center',
    },
    testerContainerStyle: {
        alignItems: 'center',
    },
    socialButtonsContainer: {
        width: 140,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    footerContainerStyle: {
        alignItems: 'center',
        height: 70,
        marginTop: 50
    },
    rateShareContainer: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    rateShareButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rateShareIconStyle: {
        marginLeft: 5
    },
};

export default About;

import React from 'react';
import { View, Text, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const ConfirmDialog = ({ children, visible, onAccept, onDecline }) => {
    const {
        cardSectionStyle,
        textStyle,
        containerStyle,
        backgroundStyle
    } = styles;

    return (
        <Modal
            visible={visible}
            transparent
            animationType='slide'
            onRequestClose={() => {}}
        >
            <View style={backgroundStyle}>
                <View style={containerStyle}>
                    <CardSection style={cardSectionStyle}>
                        <Text style={textStyle}>{children}</Text>
                    </CardSection>

                    <CardSection>
                        <Button onPress={onAccept}>Yes</Button>
                        <Button onPress={onDecline}>No</Button>
                    </CardSection>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    backgroundStyle: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    containerStyle: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 200,
        marginLeft: 20,
        marginRight: 20,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    }
};

export { ConfirmDialog };

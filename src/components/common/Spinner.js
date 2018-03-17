import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';

class Spinner extends Component {
    state = { visible: true };

    componentWillReceiveProps(nextProps) {
        const { visible = true } = nextProps;

        if (this.props.visible !== visible
            && !visible) {
            this.view.fadeOut(300).then(() => {
                this.setState({ visible: false });
            });
        }
    }

    render() {
        const { visible } = this.state;
        const {
            size,
            color,
            backgroundColor,
            fadeInAnimation
        } = this.props;
        const { spinnerStyle, hideStyle } = styles;

        const style = visible ? [spinnerStyle] : [spinnerStyle, hideStyle];
        if (backgroundColor) {
            style.push({ backgroundColor });
        }

        const animation = fadeInAnimation == null || fadeInAnimation ? 'fadeIn' : '';

        return (
            <Animatable.View
                animation={animation}
                useNativeDriver
                style={style}
                ref={(view) => { this.view = view; }}
            >
                {visible ? <ActivityIndicator
                    size={size || 'large'}
                    color={color}
                /> : null}
            </Animatable.View>
        );
    }
}

const styles = {
    hideStyle: {
        width: 0,
        height: 0
    },
    spinnerStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default Spinner;

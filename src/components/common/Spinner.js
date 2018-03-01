import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';

class Spinner extends Component {
    state = { visible: true };

    componentWillReceiveProps(nextProps) {
        const { visible = true } = nextProps;

        if (!visible) {
            this.view.fadeOut(300).then(() => {
                this.setState({ visible: false });
            });
        }
    }

    render() {
        const { visible } = this.state;
        const { size } = this.props;
        const { spinnerStyle, hideStyle } = styles;

        const style = visible ? spinnerStyle : [spinnerStyle, hideStyle];

        return (
            <Animatable.View
                animation='fadeIn'
                style={style}
                ref={(view) => { this.view = view; }}
            >
                {visible ? <ActivityIndicator size={size || 'large'} /> : null}
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

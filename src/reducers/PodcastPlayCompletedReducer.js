import {
    PODCAST_PLAY_COMPLETED
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PODCAST_PLAY_COMPLETED:
            if (state.indexOf(action.payload) !== -1) {
                return state;
            }

            return [action.payload].concat(state);

        default:
            return state;
    }
};

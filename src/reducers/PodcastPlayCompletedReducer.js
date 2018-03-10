import {
    PODCAST_PLAY_COMPLETED,
    PODCAST_PLAY_CLEAR_COMPLETED
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PODCAST_PLAY_COMPLETED:
            if (state.indexOf(action.payload) !== -1) {
                return state;
            }

            return [action.payload].concat(state);

        case PODCAST_PLAY_CLEAR_COMPLETED:
            if (state.indexOf(action.payload) === -1) {
                return state;
            }

            return state.filter((item) => item !== action.payload);

        default:
            return state;
    }
};

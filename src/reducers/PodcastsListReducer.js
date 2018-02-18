import {
    PODCASTS_FETCH_SUCCESS,
    PODCASTS_FETCH_FAILED
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PODCASTS_FETCH_SUCCESS:
            return action.payload;

        case PODCASTS_FETCH_FAILED:
            return INITIAL_STATE;

        default:
            return state;
    }
};

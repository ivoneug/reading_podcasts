import {
    PODCASTS_FETCH_SUCCESS,
    PODCASTS_FETCH_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    list: [],
    failed: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PODCASTS_FETCH_SUCCESS:
            return {
                list: action.payload,
                failed: false
            };

        case PODCASTS_FETCH_FAILED:
            return {
                list: [],
                failed: true
            };

        default:
            return state;
    }
};

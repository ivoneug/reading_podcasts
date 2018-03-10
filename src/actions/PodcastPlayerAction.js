import {
    PODCAST_PLAY_COMPLETED,
    PODCAST_PLAY_CLEAR_COMPLETED
} from './types';

export const podcastPlayCompleted = (id) => {
    return {
        type: PODCAST_PLAY_COMPLETED,
        payload: id
    };
};

export const podcastPlayUncompleted = (id) => {
    return {
        type: PODCAST_PLAY_CLEAR_COMPLETED,
        payload: id
    };
};

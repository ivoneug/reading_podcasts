import { PODCAST_PLAY_COMPLETED } from './types';

export const podcastPlayCompleted = (id) => {
    return {
        type: PODCAST_PLAY_COMPLETED,
        payload: id
    };
};

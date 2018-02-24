import { combineReducers } from 'redux';
import PodcastsListReducer from './PodcastsListReducer';
import PodcastPlayCompletedReducer from './PodcastPlayCompletedReducer';

export default combineReducers({
    podcasts: PodcastsListReducer,
    completed: PodcastPlayCompletedReducer
});

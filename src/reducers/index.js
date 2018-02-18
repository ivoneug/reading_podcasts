import { combineReducers } from 'redux';
import PodcastsListReducer from './PodcastsListReducer';

export default combineReducers({
    podcasts: PodcastsListReducer
});

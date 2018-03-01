import { Platform } from 'react-native';
import axios from 'axios';
import xml2js from 'react-native-xml2js';
import {
    PODCASTS_FETCH_SUCCESS,
    PODCASTS_FETCH_FAILED
} from './types';

export const podcastsListFetch = () => {
    return (dispatch) => {
        const urlScheme = Platform.OS === 'android' ? 'http://' : 'https://';
        const url = `${urlScheme}radiomayak.ru/podcasts/rss/podcast/703/type/audio/`;

        axios.get(url)
            .then((response) => {
                if (response && response.data) {
                    success(dispatch, response.data);
                } else {
                    failed(dispatch);
                }
            })
            .catch((err) => {
                failed(dispatch);
            });
    };
};

const success = (dispatch, data) => {
    xml2js.parseString(data, (error, result) => {
        const podcasts = result.rss.channel[0].item.map((item) => {
            let idx = item.title[0].indexOf('"');
            if (idx === -1) {
                idx = item.title[0].indexOf('-');
                if (idx !== -1) idx += 1;
            }
            if (idx === -1) {
                idx = item.title[0].indexOf('«');
                if (idx !== -1) idx += 1;
            }

            const title = item.title[0]
                            .substring(idx)
                            .replace(new RegExp('[- ]+$'), '')
                            .replace(new RegExp('["«»]', 'g'), '')
                            .trim()
                            .toUpperCase();
            const author = item.title[0]
                            .substring(0, idx)
                            .replace(new RegExp('[- ]+$'), '')
                            .replace(new RegExp('["«»]', 'g'), '')
                            .toUpperCase();

            let description = item['itunes:summary'] ? item['itunes:summary'][0] : '';
            description = description.replace(new RegExp('(?:\r\n|\r|\n)', 'g'), ' ');

            const entry = {
                id: item.guid[0]._,
                title,
                author,
                description,
                duration: item['itunes:duration'][0],
                date: item.pubDate[0],
                url: item.enclosure[0].$.url,
                length: item.enclosure[0].$.length
            };

            return entry;
        });

        dispatch({
            type: PODCASTS_FETCH_SUCCESS,
            payload: podcasts
        });
    });
};

const failed = (dispatch) => {
    dispatch({
        type: PODCASTS_FETCH_FAILED,
        payload: null
    });
};

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['completed']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
    const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
    const persistor = persistStore(store);

    return { store, persistor };
};

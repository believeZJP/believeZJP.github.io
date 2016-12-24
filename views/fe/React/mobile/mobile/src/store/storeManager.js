import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/ShoppingReducers.js';
import promiseMiddleware from '../middleware/promiseMiddleware.js';
import myMiddleware from '../middleware/middleware.js';
import initialState from './initialState.js';

const createStoreWithMiddleware = applyMiddleware(
    myMiddleware,
    promiseMiddleware
)(createStore);

export default function initStore() {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/ShoppingReducers.js', () => {
            const nextRootReducer = require('../reducers/ShoppingReducers.js');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}


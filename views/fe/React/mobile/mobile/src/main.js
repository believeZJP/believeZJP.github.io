'use strict';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin({tapMoveThreshold:1000,ignoreMouseThreshold: 1000});

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getRoutes from './routes/routes.js';
import storeManager from './store/storeManager.js';

require('es6-promise');

const routes = getRoutes();
const store = storeManager();
ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('content')
);

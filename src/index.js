import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import Store from './store/store.js';

ReactDOM.render(
    <Provider store={Store}>
        <Route />
    </Provider>
    , document.getElementById('root'));

serviceWorker.register();
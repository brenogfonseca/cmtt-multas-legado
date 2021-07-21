import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import Store from './store/store.js';
const App =
    <Provider store={Store}>
        <Route />
    </Provider>
ReactDOM.render(
    App
    , document.getElementById('root'));

serviceWorker.unregister();
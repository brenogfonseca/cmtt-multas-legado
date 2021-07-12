import { combineReducers } from 'redux';

import authReducer from './auth_reducer';
import relatorios_reducer from './relatorios_reducer';

const reducers = combineReducers({
    auth: authReducer,
    relatorios: relatorios_reducer
});

export default reducers;

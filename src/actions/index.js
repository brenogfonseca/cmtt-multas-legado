import axios from 'axios';
import moment from "moment";
import {
    LOGIN_USER,
    RELATORIOS_DIARIOS
} from './types';
import { saveToken, getHeaders, cleanToken } from './localStorage';
import { apiURL } from '../services/api';

export const initApp = () => {
    const opcaoLembrar = localStorage.getItem("opcaoLembrar");
    if (opcaoLembrar === "false") cleanToken();
}


export const getUser = () => {
    return function (dispatch) {
        axios.get(`${apiURL}/Login/getUsers`, getHeaders())
            .then((response) => {
                saveToken(response.data, true);
                dispatch({ type: LOGIN_USER, payload: response.data });
            })
            .catch((error) => console.log(error, error.response, error.response && error.response.data));
    }
}

export const getRelatorioData = () => {
    var data = new Date()
    // var date = '2010-07-24'
    var date = moment(data).format('YYYY-MM-DD')
    return function (dispatch) {
        axios.get(`${apiURL}/Relatorios/` + date, getHeaders())
            .then((response) => {
                saveToken(response.data, true);
                dispatch({ type: RELATORIOS_DIARIOS, payload: response.data });
            })
            .catch((error) => console.log(error, error.response, error.response && error.response.data));
    }
}

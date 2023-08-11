import axios from "axios";
import moment from "moment";
import { LOGIN_USER, RELATORIOS_DIARIOS } from "./types";
import { saveToken, getHeaders, cleanToken } from "./localStorage";
import { api47, apiBusca, apiURL } from "../services/api";

export const initApp = () => {
  const opcaoLembrar = localStorage.getItem("opcaoLembrar");
  if (opcaoLembrar === "false") cleanToken();
};

export const getUser = () => {
  return function (dispatch) {
    axios
      .get(`${apiURL}/Login/getUsers`, getHeaders())
      .then((response) => {
        saveToken(response.data, true);
        dispatch({ type: LOGIN_USER, payload: response.data });
      })
      .catch((error) =>
        console.log(
          error,
          error.response,
          error.response && error.response.data
        )
      );
  };
};

export const getRelatorioData = () => {
  var data = new Date();
  // var date = '2010-07-24'
  var date1 = data.setDate(data.getDate() - 1);
  var date = moment(date1).format("YYYY-MM-DD");
  return function (dispatch) {
    axios
      .get(`${apiURL}/Relatorios/` + date, getHeaders())
      .then((response) => {
        saveToken(response.data, true);
        dispatch({ type: RELATORIOS_DIARIOS, payload: response.data });
      })
      .catch((error) =>
        console.log(
          error,
          error.response,
          error.response && error.response.data
        )
      );
  };
};

export const postRelatorioDb = async (dataToSend) => {
  const { linhas, data } = dataToSend;
  const response = await apiBusca
    .post("/Relatorios/Cadastrar", { linhas, data })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
  return response;
};

export const postJsonApi = async (dataToSend) => {
  const { tipoNome, json } = dataToSend;
  let templateList;

  if (tipoNome === "AUTUACAO") {
    templateList = ["AUTUACAO", "AUTUACAO-INTERNO"];
  } else {
    templateList = ["PENALIDADE", "PENALIDADE-INTERNO"];
  }

  const responseDiario = await api47
    .post(
      `/upload/json?application=cmtt&tipo=${tipoNome}&template=${templateList[0]}`,
      { json }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));

  const responseInterno = await api47
    .post(
      `/upload/json?application=cmtt&tipo=${tipoNome}&template=${templateList[1]}`,
      { json }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));

  return { responseDiario, responseInterno };
};

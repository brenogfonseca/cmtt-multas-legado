import moment from "moment";
import { LOGIN_USER, RELATORIOS_DIARIOS } from "./types";
import { saveToken, getHeaders, cleanToken } from "./localStorage";
import { api47, apiCmtt } from "../services/api";

export const initApp = () => {
  const opcaoLembrar = localStorage.getItem("opcaoLembrar");
  if (opcaoLembrar === "false") cleanToken();
};

export const getUser = () => {
  return function (dispatch) {
    apiCmtt
      .get(`/Login/getUsers`, getHeaders())
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
    apiCmtt
      .get(`/Relatorios/` + date, getHeaders())
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

export const postRelatorioDb = async (dataToSend, setStateDb) => {
  setStateDb((prev) => ({
    ...prev,
    status: "loading",
  }));
  const { linhas, data } = dataToSend;
  const response = await apiCmtt
    .post("/Relatorios/Cadastrar", { linhas, data })
    .then((response) => {
      setStateDb({
        status: "success",
        response: response.data,
      });
      return "success";
    })
    .catch((error) => {
      setStateDb({
        status: "error",
        response: error,
      });
    });
  return response;
};

export const postJsonApi = async (dataToSend, setStateCdn) => {
  setStateCdn((prev) => ({
    ...prev,
    status: "loading",
  }));
  const { tipoNome, json } = dataToSend;

  const responseDiario = await api47
    .post(
      `/upload/json?application=cmtt&tipo=${tipoNome}&template=${tipoNome}`,
      { json }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        message: error.message,
        status: "error",
      };
    });

  const responseInterno = await api47
    .post(
      `/upload/json?application=cmtt&tipo=${tipoNome}&template=${tipoNome}-INTERNO`,
      { json }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        message: error.message,
        status: "error",
      };
    });

  setStateCdn({ responseDiario, responseInterno, status: "success" });
};

import axios from "axios";
import { getToken } from "./auth";
var apiURLBairros = "https://api.anapolis.go.gov.br/formSocialApi";
// export var apiURL = "https://api.anapolis.go.gov.br/cmtt";
export var apiURL = "http://localhost:3007";
export var cdnURL = "https://cdn.anapolis.go.gov.br/img/";
export const cdn47URL = "https://api.anapolis.go.gov.br/apiupload";
const testecdn47 = "http://localhost:4700";

const api = axios.create({
  baseURL: apiURL,
});

export const apiBairros = axios.create({
  baseURL: apiURLBairros,
});

export const apiBusca = axios.create({
  baseURL: apiURL,
});

export const api47 = axios.create({
  baseURL: testecdn47,
});

apiBusca.interceptors.request.use(async (config) => {
  const token2 = getToken();
  if (token2) {
    config.headers.Authorization = token2;
  }
  return config;
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

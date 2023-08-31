import axios from "axios";
import { getToken } from "./auth";
var apiURLBairros = "https://api.anapolis.go.gov.br/formSocialApi";
// export var apiURL = "http://localhost:3007";
export var cdnURL = "https://cdn.anapolis.go.gov.br/img/";

let apiUrl;
let cdnUrl;

if (process.env.NODE_ENV === "development") {
  apiUrl = "http://localhost:3001";
  cdnUrl = "http://localhost:4700";
} else {
  apiUrl = "https://api.anapolis.go.gov.br/apicmttteste";
  cdnUrl = "https://api.anapolis.go.gov.br/apiupload";
}
const api = axios.create({
  baseURL: apiUrl,
});

export const apiBairros = axios.create({
  baseURL: apiURLBairros,
});

export const apiCmtt = axios.create({
  baseURL: apiUrl,
});

export const api47 = axios.create({
  baseURL: cdnUrl,
});

apiCmtt.interceptors.request.use(async (config) => {
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

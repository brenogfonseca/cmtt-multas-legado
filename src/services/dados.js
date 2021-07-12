import { TOKEN_KEY } from "./../services/auth";
import { apiBusca } from "./../services/api";

export const token = localStorage.getItem(TOKEN_KEY);

export function parseJwt(token) {
  if (!token) {
    return;
  }
  token = token.substring(7);
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
//REGRAS GET

export const getRelatorioData = async (data) => {
  const config = {
    headers: { 'Authorization': token }
  }
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(apiBusca.get("/Relatorios/" + data, config));
    }, 200)
  );
};

export function ts2human(time) {
  var ts = time;
  var dt = new Date(ts * 1000);
  return (ts, dt.toLocaleString());
}
export function human2ts(data) {
  var di = data;
  var ts = Date.parse(di);

  return (ts / 1000, ts / 1000);
}

export const isAuthenticated = () => {
  if (localStorage.getItem(TOKEN_KEY) === null) {
    return false
  } else {
    var userLogged = parseJwt(token).username
    var expira = parseJwt(token).exp
    var data = new Date();
    var dataTS = human2ts(data)
    if (userLogged !== null && expira > dataTS) {
      return true;
    } else {
      return false;
    }
  }
}
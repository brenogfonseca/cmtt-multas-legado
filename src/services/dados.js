import { TOKEN_KEY } from "./../services/auth";
import { apiBusca, apiBairros } from "./../services/api";

export const token = localStorage.getItem(TOKEN_KEY);

function parseJwt(token) {
  if (!token) {
    return;
  }
  token = token.substring(7);
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
//REGRAS GET

export const readfileautomatically = async () => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/penalidade.txt', true);
  xhr.responseType = 'text';
  xhr.overrideMimeType("application/json");

  var texto = '';

  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        texto = xhr.response;
        var linhas = texto.split(/\n/);
        for (var linha in linhas) {
          var envio = linhas[linha]
          // console.log(envio)
        }
      }
    }
  };
  // console.log(xhr)
  xhr.send();
  return xhr
}

export const getUsers = async () => {
  const config = {
    headers: { 'Authorization': token }
  }
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(apiBusca.get("/cadastros/getUsers", config));
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
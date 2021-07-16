import { TOKEN_KEY } from "./../services/auth";
import { apiBusca } from "./../services/api";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { base64Img } from "../components/logo";
import moment from "moment";
/* eslint eqeqeq: "off", "no-unused-vars": "off", curly: "error" */

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
export const getPlacasPenalidades = async (placa) => {
  const config = {
    headers: { 'Authorization': token }
  }
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(apiBusca.get("/Busca/Penalidades/" + placa, config));
    }, 200)
  );
};

export const getPlacasAutuacao = async (placa) => {
  const config = {
    headers: { 'Authorization': token }
  }
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(apiBusca.get("/Busca/Autuacao/" + placa, config));
    }, 200)
  );
};

export const getPlacasDatas = async (data, data2) => {
  const config = {
    headers: {
      'Authorization': token,
    },

  }
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(apiBusca.get("/Busca/BuscaDatas/" + data + "/" + data2, config));
    }, 200)
  );
};


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

export function PrintDocumentImport(props) {

  const doc = new jsPDF('landscape')
  props.map(prop => {
    //prop.dt_infracao = moment(prop.dt_infracao).format('DD/MM/YYYY')
    prop.venc_notificacao = moment(prop.venc_notificacao).format('DD/MM/YYYY')
    if (prop.tipo_notif == 2) { prop.tipo_notif = '2 - Penalidade' }
    else if (prop.tipo_notif == 1) {
      prop.tipo_notif = '1 - Autuação'
      prop.money = '-'
    }
    return ''
  })

  doc.autoTable({
    didDrawPage: function (data) {
      doc.addImage(base64Img, 'PNG', 120, 10, 80, 15)
    },
    startY: 30,
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [15, 76, 129] }, // European countries centered
    body: props,
    margin: { top: 30 },
    columns: [
      { header: 'Tipo', dataKey: 'tipo' },
      { header: 'Seq', dataKey: 'sequencial' },
      { header: 'Placa', dataKey: 'placa' },
      { header: 'Auto de Infração', dataKey: 'auto' },
      { header: 'Tipo Notificação', dataKey: 'tipo_notif' },
      { header: 'Motivo', dataKey: 'motivo' },
      { header: 'Dt. Postagem', dataKey: 'dt_postagem' },
      { header: 'Cod. Infração', dataKey: 'cod_infracao' },
      { header: 'Cod. Autuador', dataKey: 'autuador' },
      { header: 'Chave', dataKey: 'chave' },
      { header: 'Dt. Publicação', dataKey: 'dt_publicacao' },
      { header: 'Dt. Vencimento', dataKey: 'venc_notificacao' },
      { header: 'Valor Infração', dataKey: 'money' },
      { header: 'Dt. Infração', dataKey: 'dt_infracao' },
    ],
  })
  doc.save('table.pdf')
}
import React, { Component } from "react";
import moment from "moment";
import { apiBusca } from "../services/api";
import { Toast, apareceAlert } from "../components/Alert";
import { PrintDocumentImport, PrintDocumentImport2 } from "../services/dados";
/* eslint eqeqeq: "off", "no-unused-vars": "off", curly: "error" */

function convertDate(date) {
  if (date == "" || date == undefined || date == null) {
    return null;
  }
  var dt_postagem_ano = date.substr(0, 4);
  var dt_postagem_mes = date.substr(4, 2);
  var dt_postagem_dia = date.substr(6, 2);

  return dt_postagem_dia + "/" + dt_postagem_mes + "/" + dt_postagem_ano;
}

function convertDateUS(date) {
  if (date == "" || date == undefined || date == null) {
    return null;
  }
  var dt_postagem_ano = date.substr(0, 4);
  var dt_postagem_mes = date.substr(4, 2);
  var dt_postagem_dia = date.substr(6, 2);

  return dt_postagem_ano + "-" + dt_postagem_mes + "-" + dt_postagem_dia;
}

function TableFaixaEtaria(props) {
  if (props == "" || props == undefined || props == null) {
    return null;
  }
  var dados = props.dados;

  return dados.map(function (item, i) {
    var tipo_notificacao;
    if (item.tipo_notif == 2) {
      tipo_notificacao = "2 - Penalidade";
    } else if (item.tipo_notif == 1) {
      tipo_notificacao = "1 - Autuação";
    }
    return (
      <tr key={i}>
        <td>{item.tipo}</td>
        <td>{item.sequencial}</td>
        <td>{item.placa}</td>
        <td>{item.auto}</td>
        <td>{tipo_notificacao}</td>
        <td>{item.motivo}</td>
        <td>{item.dt_postagem}</td>
        <td>{item.cod_infracao}</td>
        <td>{item.autuador}</td>
        <td>{item.chave}</td>
        <td>{item.dt_venc_notif}</td>
        <td>{item.money}</td>
        <td>{item.dt_infracao}</td>
      </tr>
    );
  });
}

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dadosEntregues: [],
      dadosAvisos: [],
      dados: [],
      linhas: [],
      alert: {
        status: "",
        message: "",
      },
    };
    this.getEventos = this.getEventos.bind(this);
    this.SendForm = this.SendForm.bind(this);
  }

  async getEventos() {}

  async SendForm(event) {
    const confirma = window.confirm(
      "Tem Certeza que deseja Cadastrar, não sera possível exportar?"
    );
    if (confirma === true) {
      event.preventDefault();
      const { linhas } = this.state;
      var raw = { linhas };
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Authorization", token)

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      await apiBusca
        .post("/Relatorios/cadastrar", requestOptions)
        .then((response) => {
          this.setState({
            alert: {
              status: response.data.response.status,
              message: response.data.response.result,
            },
          });
          let propis = this.props;
          if (this.state.alert.status === 201) {
            Toast.fire({
              icon: "success",
              title: this.state.alert.message,
            }).then(function () {
              apareceAlert(propis);
            });
          } else if (this.state.alert.status !== 201) {
            Toast.fire({
              icon: "error",
              title: this.state.alert.message,
            });
          }
        })

        .catch((error) => {
          this.setState({
            alert: {
              status: 201,
              message:
                "Contate o Desenvolvedor do Sistema! cadastrarUnidades()->BAD_CONFIG",
            },
          });
        });
    } else {
      event.preventDefault();
    }
  }

  componentDidMount() {
    this.getEventos();
  }
  render() {
    return (
      <div>
        <h2 className="pma-center">Importador Penalidades</h2>
        <button
          className="btn btn-pdf"
          onClick={() => PrintDocumentImport(this.state.linhas)}
        >
          PDF
        </button>
        <button
          className="btn btn-cmtt-exp"
          style={{ marginLeft: "1vw" }}
          onClick={() => PrintDocumentImport2(this.state.linhas)}
        >
          PDF INTERNO CMTT
        </button>
        <p />
        <div>
          <input type="file" onChange={(e) => this.showFile(e)} />
          <p />
          <table
            id="table"
            className="data-table-wrapper form-center table table-bordered display table-action wrap dataTable no-footer"
            style={{ width: 100 + "%" }}
            refs="main"
          >
            <thead>
              <tr className="title_table">
                <th>Tipo</th>
                <th>Seq</th>
                <th>Placa</th>
                <th>Auto</th>
                <th>Tipo Notificação</th>
                <th>Motivo</th>
                <th>Postagem</th>
                <th>Cod. Infração</th>
                <th>Autuador</th>
                <th>Chave</th>
                <th>Venc. Notificação</th>
                <th>Valor da Infração</th>
                <th>Data da Infração</th>
              </tr>
            </thead>
            <tbody>
              {/* <TableFaixaEtaria dados={this.state.linhas} /> */}
            </tbody>
          </table>
          <form id="wizard" onSubmit={this.SendForm}>
            <button
              className="btn btn-excel pma-center"
              style={{ marginLeft: 10 + "px" }}
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Content;

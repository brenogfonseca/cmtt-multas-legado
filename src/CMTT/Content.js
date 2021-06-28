import React, { Component } from "react";
import { readfileautomatically } from "../services/dados";
const readline = require('readline');
const fs = require('fs');
//import * as fs from 'fs/promises';
/* eslint eqeqeq: "off", "no-unused-vars": "off", curly: "error" */


function TableFaixaEtaria(props) {
  if (props == '' || props == undefined || props == null) {
    return null
  }
  var dados = props.dados


  return dados.map(function (item, i) {
    var tipo, sequencial, placa, auto, tipo_not
    var estilo, style, style2
    // tipo = item.substr(0, 2)
    // sequencial = item.substr(2, 6)
    // placa = item.substr(8, 7)
    return (
      <tr className={estilo} key={i}>
        <td>{item.tipo}</td>
        <td>{item.sequencial}</td>
        <td>{item.placa}</td>
        <td>{item.auto}</td>
        <td>{item.tipo_notif}</td>
        <td>{item.motivo}</td>
        <td>{item.postagem}</td>
        <td>{item.cod_infracao}</td>
        <td>{item.autuador}</td>
        <td>{item.chave}</td>
        <td>{item.publicacao}</td>
        <td>{item.venc_notif}</td>
        <td>{item.valor_infracao}</td>
        <td>{item.postagem}</td>
      </tr>
    )
  })
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
        status: '',
        message: ''
      }
    };
    this.getEventos = this.getEventos.bind(this);

  }



  async getEventos() {
  }

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = (e.target.result)
      const textLinhas = text.split("\n");
      textLinhas.pop()
      textLinhas.pop()
      textLinhas.shift()
      const textObjetos = textLinhas.map((textLinha, i) => {
        textLinha = textLinha.replace(/\s+/g, '');
        return {
          tipo: textLinha.slice(0, 2),
          sequencial: textLinha.slice(2, 8),
          placa: textLinha.slice(8, 15),
          auto: textLinha.slice(15, 25),
          tipo_notif: textLinha.slice(25, 26),
          motivo: textLinha.slice(26, 28),
          postagem: textLinha.slice(28, 36),
          cod_infracao: textLinha.slice(36, 41),
          autuador: textLinha.slice(41, 47),
          chave: textLinha.slice(47, 57),
          publicacao: textLinha.slice(57, 65),
          venc_notif: textLinha.slice(65, 73),
          valor_infracao: textLinha.slice(-12),
        }
      })
      console.log(textObjetos)
      this.setState({ linhas: textObjetos })
    };
    reader.readAsText(e.target.files[0])
  }

  showFile2 = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = (e.target.result)
      var textLinhas = text.split("\n");
      const arrayLinhas = textLinhas.map(textLinha => {
        var teste = textLinha.replace(/\s/g, '')
        // textLinhas.replace(, '')
        return teste
      })
      console.log(arrayLinhas[1])
      this.setState({ linhas: arrayLinhas })
      // alert(textLinhas[0])
    };
    reader.readAsText(e.target.files[0])
  }


  componentDidMount() {
    this.getEventos();
  }
  render() {
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">Dados Gerais</h3>
                </div>
                <div className='row'>
                  <input type="file" onChange={(e) => this.showFile(e)} />
                  <br />
                  <table id="table" className="data-table-wrapper form-center table table-bordered display table-action wrap dataTable no-footer" style={{ width: 100 + "%" }}
                    refs="main">
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
                        <th>Publicação</th>
                        <th>Venc. Notificação</th>
                        <th>Valor ds Infração</th>
                        <th>Data da Infração</th>
                      </tr>
                    </thead>
                    <tbody>
                      <TableFaixaEtaria dados={this.state.linhas} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div >
          </div>
        </section>
      </div>
    );
  }
}
export default Content;

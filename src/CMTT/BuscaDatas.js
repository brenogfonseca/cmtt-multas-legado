import { Grid, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import InputMask from 'react-input-mask';
import SearchIcon from '@material-ui/icons/Search';
import { getPlacasDatas } from "../services/dados";
import moment from "moment";
//import * as fs from 'fs/promises';
/* eslint eqeqeq: "off", "no-unused-vars": "off", curly: "error" */

function convertDateUS(date) {
    if (date == '' || date == undefined || date == null) {
        return null
    }
    var dt_postagem_ano = date.substr(6, 4)
    var dt_postagem_mes = date.substr(3, 2)
    var dt_postagem_dia = date.substr(0, 2)
    return dt_postagem_ano + "-" + dt_postagem_mes + "-" + dt_postagem_dia
}

function TableFaixaEtaria(props) {
    if (props == '' || props == undefined || props == null) {
        return null
    }
    var dados = props.dados
    return dados.map(function (item, i) {
        var tipo_notificacao
        item.dt_infracao = moment(item.dt_infracao).format('DD/MM/YYYY')
        item.venc_notificacao = moment(item.venc_notificacao).format('DD/MM/YYYY')
        item.dt_postagem = moment(item.dt_postagem).format('DD/MM/YYYY')
        item.dt_publicacao = moment(item.dt_publicacao).format('DD/MM/YYYY')
        item.ver = moment(item.dt_cadastro).format('YYYYMMDD')
        let ver = "https://cdn.anapolis.go.gov.br/docs-cmtt/" + item.ver + ".pdf"

        if (item.tipo_notificacao == 2) { tipo_notificacao = '2 - Penalidade' }
        else if (item.tipo_notificacao == 1) {
            tipo_notificacao = '1 - Autuação'
            item.valor_infracao = '-'
        }
        return (
            <tr key={i}>
                <td>{item.placa}</td>
                <td>{item.auto}</td>
                <td>{tipo_notificacao}</td>
                <td>{item.dt_infracao}</td>
                <td>{item.cod_infracao}</td>
                <td>{item.autuador}</td>
                <td>{item.venc_notificacao}</td>
                <td>{item.valor_infracao}</td>
                <td>{<a target='_blank' href={ver}><SearchIcon /></a>}</td>
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
            },
            data: '',
            data2: '',
            open: true
        };
        this.getEventos = this.getEventos.bind(this);
        this.SendPesquisaData = this.SendPesquisaData.bind(this)

    }

    async getEventos() {
    }

    SendPesquisaData(e) {
        e.preventDefault();
        var date = this.state.data
        var date2 = this.state.data2
        var data = convertDateUS(date)
        var data2 = convertDateUS(date2)
        this.setState({ open: false })
        getPlacasDatas(data, data2).then(response => {
            this.setState({ linhas: response.data })
        })
    }


    componentDidMount() {
        this.getEventos();
    }
    render() {
        return (
            <div>
                <Grid item xs={12}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <div>
                        <h2 className='pma-center'>Busca Por Datas</h2>
                        <form id="wizard" onSubmit={this.SendPesquisaData}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField style={{ display: 'none' }} />
                                    <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl">
                                        <InputMask
                                            placeholder='Data Inicio'
                                            className='MuiInputBase-input MuiInput-input'
                                            required
                                            value={this.state.data}
                                            onChange={e => this.setState({ data: e.target.value })}
                                            mask="99/99/9999"
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField style={{ display: 'none' }} />
                                    <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl">
                                        <InputMask
                                            placeholder='Data Final'
                                            className='MuiInputBase-input MuiInput-input'
                                            required
                                            value={this.state.data2}
                                            onChange={e => this.setState({ data2: e.target.value })}
                                            mask="99/99/9999"
                                        />
                                    </div>
                                </Grid>

                            </Grid>
                            <Button className='btn btn-cmtt pma-center' style={{ marginTop: '15px', width: '100%' }} >
                                Buscar Datas
                            </Button>
                        </form>
                    </div>
                </Grid>
                <br />
                <div>
                    <table hidden={this.state.open} id="table" className="data-table-wrapper form-center table table-bordered display table-action wrap dataTable no-footer" style={{ width: 100 + "%" }}
                        refs="main">
                        <thead>
                            <tr className="title_table">
                                <th>Placa</th>
                                <th>Auto</th>
                                <th>Tipo Notificação</th>
                                <th>Data da Infração</th>
                                <th>Cod. Infração</th>
                                <th>Autuador</th>
                                <th>Venc. Notificação</th>
                                <th>Valor Infração</th>
                                <th>Ver</th>

                            </tr>
                        </thead>
                        <tbody>
                            <TableFaixaEtaria dados={this.state.linhas} />
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}
export default Content;


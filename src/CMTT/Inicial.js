import { Grid, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import InputMask from 'react-input-mask';

import { getPlacasAutuacao, getPlacasPenalidades } from "../services/dados";
import moment from "moment";
//import * as fs from 'fs/promises';
/* eslint eqeqeq: "off", "no-unused-vars": "off", curly: "error" */


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
        if (item.tipo_notificacao == 2) { tipo_notificacao = '2 - Penalidade' }
        else if (item.tipo_notificacao == 1) {
            tipo_notificacao = '1 - Autuação'
            item.valor_infracao = '-'
        }
        return (
            <tr key={i}>
                <td>{item.tipo}</td>
                <td>{item.seq}</td>
                <td>{item.placa}</td>
                <td>{item.auto}</td>
                <td>{tipo_notificacao}</td>
                <td>{item.motivo}</td>
                <td>{item.dt_postagem}</td>
                <td>{item.cod_infracao}</td>
                <td>{item.autuador}</td>
                <td>{item.chave}</td>
                <td>{item.dt_publicacao}</td>
                <td>{item.venc_notificacao}</td>
                <td>{item.valor_infracao}</td>
                <td>{item.dt_infracao}</td>
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
            placa: '',
            placa2: '',
            open: true
        };
        this.getEventos = this.getEventos.bind(this);


    }

    async getEventos() {
    }

    componentDidMount() {
        this.getEventos();
    }
    render() {
        var cdn = 'https://cdn.anapolis.go.gov.br'
        return (
            <div>
                <Grid item xs={12} container>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} align='center'>
                            <a href="/BuscaPlaca">
                                <img
                                    className="pma-itens img-responsive"
                                    alt="decretos"
                                    src={cdn + "/img/cmtt/cmtt.png"}
                                />
                            </a>
                        </Grid>
                        <Grid item xs={12} sm={6} align='center'>
                            <a href="/Formularios">
                                <img
                                    className="pma-itens img-responsive"
                                    alt="decretos"
                                    src={cdn + "/img/cmtt/formularios.png"}
                                />
                            </a>
                        </Grid>
                        <Grid item xs={12} sm={6} align='center'>
                            <a href="/RelatorioDiario">
                                <img
                                    className="pma-itens img-responsive"
                                    alt="decretos"
                                    src={cdn + "/img/cmtt/relatorio.png"}
                                />
                            </a>
                        </Grid>
                        <Grid item xs={12} sm={6} align='center'>
                            <a rel="noreferrer" target='_blank' href="http://www.anapolis.go.gov.br/transito/">
                                <img
                                    className="pma-itens img-responsive"
                                    alt="decretos"
                                    src={cdn + "/img/cmtt/radares.png"}
                                />
                            </a>
                        </Grid>
                    </Grid>
                </Grid>

            </div >
        );
    }
}
export default Content;


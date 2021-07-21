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
                            <a target='_blank' href="./docs/FORMULÁRIO - REQUERIMENTOS DIVERSOS - CMTT.pdf">
                                <h1>REQUERIMENTOS DIVERSOS</h1>
                            </a>
                        </Grid>
                        <Grid item xs={12} sm={6} align='center'>
                            <a target='_blank' href="./docs/FORMULÁRIO - IDENTIFICAÇÃO DE CONDUTOR INFRATOR - CMTT.pdf">
                                <h1>IDENTIFICAÇÃO DE CONDUTOR INFRATOR</h1>
                            </a>
                        </Grid>
                        <Grid item xs={12} sm={6} align='center'>
                            <a target='_blank' href="./docs/FORMULÁRIO - DEFESA PRÉVIA OU RECURSO - CMTT.pdf">
                                <h1>DEFESA PRÉVIA OU RECURSO</h1>
                            </a>
                        </Grid>
                        <Grid item xs={12} sm={6} align='center'>
                            <a target='_blank' href="./docs/FORMULÁRIO - REQUERIMENTO DE EFEITO SUSPENSIVO - CMTT.pdf">
                                <h1> REQUERIMENTO DE EFEITO SUSPENSIVO</h1>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>

            </div >
        );
    }
}
export default Content;


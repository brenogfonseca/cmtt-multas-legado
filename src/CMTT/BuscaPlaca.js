import { Grid, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { apiBusca } from "../services/api";
//import * as fs from 'fs/promises';
/* eslint eqeqeq: "off", "no-unused-vars": "off", curly: "error" */


function TableFaixaEtaria(props) {
    if (props == '' || props == undefined || props == null) {
        return null
    }

    var dados = props.dados
    return dados.map(function (item, i) {
        var tipo_notificacao
        if (item.tipo_notif == 2) { tipo_notificacao = '2 - Penalidade' }
        else if (item.tipo_notif == 1) { tipo_notificacao = '1 - Autuação' }
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
                <td>{item.dt_publicacao}</td>
                <td>{item.dt_venc_notif}</td>
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
            }
        };
        this.getEventos = this.getEventos.bind(this);

    }



    async getEventos() {
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
                        <h2 className='pma-center'>Busca Autuação</h2>
                        <form id="wizard" onSubmit={this.SendForm}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="nome"
                                        name="nome"
                                        label="Nome"
                                        // onChange={ }
                                        fullWidth
                                        autoComplete="nome"
                                    />
                                </Grid>
                                <Button className='btn btn-excel pma-center' style={{ marginLeft: 10 + 'px' }}                >
                                    Buscar Autuação Placa
                                </Button>
                            </Grid>
                        </form>
                    </div>
                    <div>
                        <h2 className='pma-center'>Busca Penalidade</h2>
                        <form id="wizard" onSubmit={this.SendForm}>
                            <Button className='btn btn-excel pma-center' style={{ marginLeft: 10 + 'px' }}                >
                                Buscar Autuação Placa
                            </Button>
                        </form>
                    </div>
                </Grid>
                <br />
                <div>
                    <table hidden id="table" className="data-table-wrapper form-center table table-bordered display table-action wrap dataTable no-footer" style={{ width: 100 + "%" }}
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
                                <th>Data da Infração</th>
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

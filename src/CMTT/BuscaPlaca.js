import { Grid, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import InputMask from 'react-input-mask';
import SearchIcon from '@material-ui/icons/Search';
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
                <td hidden={props.tipo === 'autuacao'}>{item.valor_infracao}</td>
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
            placa: '',
            placa2: '',
            open: true,
            tipoBusca: ''
        };
        this.getEventos = this.getEventos.bind(this);
        this.SendAutuacao = this.SendAutuacao.bind(this)
        this.SendPenalidade = this.SendPenalidade.bind(this)

    }

    async getEventos() {
    }

    SendAutuacao(e) {
        e.preventDefault();
        var placa = this.state.placa
        this.setState({ open: false })
        var teste = placa.replace('-', '')
        var teste2 = teste.toUpperCase()
        getPlacasAutuacao(teste2).then(response => {
            this.setState({ linhas: response.data, tipoBusca: 'autuacao' })
        })
    }

    SendPenalidade(e) {
        e.preventDefault();
        var placa = this.state.placa2
        this.setState({ open: false })
        var teste = placa.replace('-', '')
        var teste2 = teste.toUpperCase()

        getPlacasPenalidades(teste2).then(response => {
            this.setState({ linhas: response.data, tipoBusca: 'penalidade' })
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

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} align='center'>
                                <h2 className='pma-center'>Notificação de Autuação</h2>
                                <form id="wizard" onSubmit={this.SendAutuacao}>
                                    <TextField style={{ display: 'none' }} />
                                    <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl">
                                        <InputMask
                                            placeholder='Placa'
                                            className='MuiInputBase-input MuiInput-input'
                                            required
                                            value={this.state.placa}
                                            onChange={e => this.setState({ placa: e.target.value })}
                                            mask='aaa-9*99'
                                        />
                                    </div>
                                    <Button className='btn btn-cmtt pma-center' style={{ marginTop: '15px' }} >
                                        Consultar Placa
                                    </Button>
                                </form>
                            </Grid>
                            <Grid item xs={12} sm={6} align='center'>
                                <h2 className='pma-center'>Notificação de Penalidade</h2>
                                <form id="wizard" onSubmit={this.SendPenalidade}>
                                    <TextField style={{ display: 'none' }} />
                                    <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl">
                                        <InputMask
                                            placeholder='Placa'
                                            className='MuiInputBase-input MuiInput-input'
                                            required
                                            value={this.state.placa2}
                                            onChange={e => this.setState({ placa2: e.target.value })}
                                            mask='aaa-9*99'
                                        />
                                    </div>
                                    <Button className='btn btn-cmtt pma-center' style={{ marginTop: '15px' }}  >
                                        Consultar Placa
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
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
                                <th hidden={this.state.tipoBusca === 'autuacao'}>Valor Infração</th>
                                <th>Ver</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableFaixaEtaria tipo={this.state.tipoBusca} dados={this.state.linhas} />
                        </tbody>
                    </table>

                </div>
                <br />
                <div style={{
                    width: '75%', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto'
                }}>
                    <br />
                    <div >
                        Todas as autuações de competência do Detran - GO, por infração capitulada no Código de Trânsito Brasileiro(CTB - Lei 9.503/97), a partir de 01/08/2018 passaram a ter seu extrato resumido publicado em Diário Oficial do Estado e a íntegra das notificações no sítio desta Entidade de Trânsito, nos termos da Resolição CONTRAN 619/2016, com vistas a cientificar das autuações e penalidades aplicadas e facilitar o acesso às informações pertinentes.
                    </div>
                </div>
            </div >
        );
    }
}
export default Content;


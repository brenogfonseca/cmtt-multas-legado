import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Sidebar from "./Sidebar";
import NavTop from "./Navtop";
import Footer from "../components/Footer";
import { apiBusca } from "../services/api";
import { getUsersID, token } from "../services/dados"

function Alerta(param) {
    const open = param.setOpen;
    var status = param.classe
    var classe
    if (status === 200) {
        classe = "success"
    } else if (status === 201 || status === 110) {
        classe = "error"
    }
    return (
        <div>
            <Snackbar open={open} autoHideDuration={200}>
                <Alert severity={classe}>
                    {param.texto}
                </Alert>
            </Snackbar>
        </div>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class TrocaSenha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dados: [],
            cpf: '',
            alert: {
                status: '',
                message: ''
            },
        };
        this.getEventos = this.getEventos.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getEventos() {
        getUsersID().then(response2 => {
            this.setState({
                dados: response2.data,
                cpf: response2.data.username
            })
        });
    }

    componentDidMount() {
        this.getEventos();
    }

    apareceAlert() {
        setTimeout(() => {
            this.setState({ setOpen: false })
            return (window.location = "/Vacina");
        }, 1 * 1000)
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        function stringifyFormData(fd) {
            const data = {};
            for (let key of fd.keys()) {
                data[key] = fd.get(key);
            }
            return JSON.stringify(data, null, 2);
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token)

        var raw = stringifyFormData(data);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        apiBusca.post("/cadastros/trocarSenha/", requestOptions)
            .then(response => {
                this.setState({
                    alert: {
                        status: response.data.response.status,
                        message: response.data.response.result
                    }
                })
                this.setState({ setOpen: true })
                this.apareceAlert()

            })
            .catch(error => error)
        //event.target.reset();
    }
    render() {
        var alertMsg = this.state.alert
        return (
            <div className="skin-blue bg-light sidebar-mini" id="panel">
                <div className="wrapper">
                    <NavTop dados={this.state.dados} />
                    <Sidebar dados={this.state.dados} />
                    <div className="content-wrapper">
                        {/* Content Header (Page header) */}
                        <section className="content-header">
                            <h1>
                                Trocar Senha
          </h1>
                            <ol className="breadcrumb">
                                <li>
                                    <a href="/Vacina">
                                        <i className="fa fa-dashboard" />Início
              </a>
                                </li>
                            </ol>
                        </section>
                        {/* Main content */}
                        <section className="content">
                            <form id="wizard" onSubmit={this.handleSubmit}>
                                <Alerta
                                    setOpen={this.state.setOpen}
                                    texto={alertMsg.message}
                                    classe={alertMsg.status} />
                                <fieldset className="card">
                                    <legend className="card-header text-left legend-pma faq-btn-link">
                                        Informações importantes
              </legend>
                                    <div id='senhas'></div>
                                    <div className="col-md-12 campos-pma card-body">
                                        <div className="col-md-12" id="">
                                            <TextField
                                                required
                                                className="ml-3 mb-3 col-md-12"
                                                id="filled-size-normal"
                                                InputProps={{
                                                    readOnly: true
                                                }}
                                                InputLabelProps={{
                                                    readOnly: true,
                                                    shrink: true
                                                }}
                                                fullWidth
                                                name="username"
                                                label="C.P.F."
                                                value={this.state.cpf}
                                                variant="outlined"
                                                type="text"
                                            />
                                        </div>
                                        <div className="col-md-12" id="senhaDiv">
                                            <TextField
                                                required
                                                className="mb-3 ml-3 col-md-12"
                                                id="senha"
                                                InputProps={{
                                                    readOnly: false
                                                }}
                                                fullWidth
                                                name="novaSenha"
                                                label="Nova Senha"
                                                variant="outlined"
                                                type="password"
                                                inputProps={{
                                                    maxLength: 15,
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-12" id="confSenhaDiv">
                                            <TextField
                                                required
                                                className="mb-3 ml-3 col-md-12"
                                                id="confSenha"
                                                InputProps={{
                                                    readOnly: false
                                                }}
                                                fullWidth
                                                name="novaSenhaConf"
                                                label="Repita a Senha"
                                                variant="outlined"
                                                type="password"
                                            />
                                        </div>
                                        <button
                                            id="alteraSenha"
                                            disabled
                                            className="btn-pv col-md-12 text-center btn-secondary"
                                            type="submit"
                                        >
                                            Alterar Senha
                </button>
                                    </div>
                                </fieldset>
                            </form>
                        </section>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default TrocaSenha;

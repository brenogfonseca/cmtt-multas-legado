import React, { Component } from "react";
import { TextField, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import Sidebar from "../Vacina/Sidebar";
import NavTop from "../Vacina/Navtop";
import Footer from "../components/Footer";
import { apiBusca } from "../services/api";
import { getUsers, token, getUsersCPF, getUnidadesCad } from "../services/dados"
import Swal from 'sweetalert2'

const $ = require('jquery');


export function Alerta(param) {
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
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function apareceAlert(props) {
    var url = props.location.pathname
    var path = props.location.search
    var caminho = url + path
    return (window.location = caminho);
}

class Contatos extends Component {
    constructor() {
        super();
        this.state = {
            dados: [],
            role: '',
            nome: '',
            cpf: '',
            senha: '123456',
            alert: {
                status: '',
                message: ''
            },
            setOpen: false,
            unidadesCad: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getEventos = this.getEventos.bind(this);
    }

    getEventos() {
        getUsers().then(response2 => {
            this.setState({ dados: response2.data })
        });
        getUnidadesCad().then(response2 => {
            this.setState({ unidadesCad: response2.data })
        });
    }

    componentDidMount() {
        this.getEventos();
    }

    // apareceAlert() {
    //     setTimeout(() => {
    //         this.setState({ setOpen: false })
    //         this.setState({
    //             role: '',
    //             nome: '',
    //             cpf: '',
    //             senha: ''
    //         })
    //     }, 3 * 10)
    // }

    buscaCpf = event => {
        var id = event.target.value;
        getUsersCPF(id).then(response => {
            if (response.data === 1) {
                alert("Usuario já Cadastrado")
                this.setState({ cpf: '' })
                setTimeout(() => {
                    $("#resposta").html('');
                }, 1 * 1000)
            } else {
                setTimeout(() => {
                    $("#resposta").html('');
                }, 1 * 1000)
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { nome, abrangencia } = this.state
        var raw = { nome, abrangencia }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token)
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        console.log(raw)
        apiBusca.post("/cadastros/formCadUnidades", requestOptions)
            .then(response => {
                this.setState({
                    alert: {
                        status: response.data.response.status,
                        message: response.data.response.result
                    }
                })
                let propis = this.props
                if (this.state.alert.status === 200) {
                    Toast.fire({
                        icon: 'success',
                        title: this.state.alert.message
                    }).then(function () {
                        apareceAlert(propis)
                    })

                }
                else if (this.state.alert.status === 201) {
                    Toast.fire({
                        icon: 'error',
                        title: this.state.alert.message
                    })
                }
            })

            .catch(error => {
                this.setState({
                    alert: {
                        status: 201,
                        message: "Contate o Desenvolvedor do Sistema! cadastrarUnidades()->BAD_CONFIG"
                    }
                })
            })
        event.target.reset();
    }

    render() {
        var alertMsg = this.state.alert
        var valores = this.state.unidadesCad
        return (
            <div className="skin-blue bg-light sidebar-mini" id="panel">
                <div className="wrapper">
                    <NavTop dados={this.state.dados} />
                    <Sidebar dados={this.state.dados} />
                    <br />
                    <div className="content-wrapper">
                        {/* Content Header (Page header) */}
                        <section className="content-header">
                            <h1>
                                Início
            <small>V. API 0.1</small>
                            </h1>
                            <ol className="breadcrumb">
                                <li>
                                    <a href="/Social">
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

                                    <div className="col-md-12 campos-pma card-body">

                                        <TextField
                                            required
                                            className="ml-3 mb-3 col-md-11"
                                            id="filled-size-normal"
                                            InputProps={{
                                                readOnly: false
                                            }}
                                            fullWidth
                                            name="nome"
                                            label="Nome Unidade/Vacinador"
                                            variant="outlined"
                                            type="text"
                                            onChange={e => this.setState({ nome: e.target.value })}
                                        />
                                        <TextField
                                            required
                                            className="mb-3 ml-3 col-md-11 required"
                                            id="abrangencia"
                                            select
                                            fullWidth
                                            name="abrangencia"
                                            SelectProps={{
                                                native: true,
                                            }}
                                            value={this.state.abrangencia}
                                            onChange={e => this.setState({ abrangencia: e.target.value })}
                                            label="Abrangência"
                                            variant="outlined"
                                        >
                                            <option key={0} value=''></option>
                                            {valores.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    </div>
                                </fieldset>
                                <button
                                    className="btn-pv col-md-12 text-center btn-primary"
                                    type="submit"
                                >
                                    Cadastrar
                </button>
                            </form>
                        </section>
                    </div>
                    <Footer />
                </div >
            </div >
        );
    }
}
export default Contatos;

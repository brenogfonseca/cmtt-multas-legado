import React, { Component } from "react";
import { Grid, TextField } from "@material-ui/core";
import api from "./../services/api";
import { getToken, TOKEN_KEY } from "./../services/auth";
import { isAuthenticated } from './../services/dados'
import { Toast } from "./Alert";
import { useHistory } from "react-router-dom";

class Acesso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senha: "",
      error: "",
      err: "none"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { cpf, senha } = this.state;
    if (!cpf || !senha) {
      this.setState({
        error: "Preencha C.P.F. e senha para continuar!",
        err: "block"
      });
    } else {
      var group = TOKEN_KEY
      await api.post("/login/", { cpf, senha, group }).then(response => {
        this.setState({
          alert: {
            status: response.data.status,
            message: response.data.message
          }
        })
        if (this.state.alert.status === 210 || this.state.alert.status === 211) {
          Toast.fire({
            icon: 'error',
            title: this.state.alert.message
          })
        }
        else if (this.state.alert.status === 200) {
          localStorage.setItem(TOKEN_KEY, response.data.token)
          return (window.location = "/");
        }
      })
    }
  };

  render() {
    if (getToken() != null || getToken() != undefined) {
      return (window.location = "/");
    }
    return (
      <Grid item xs={12}
      >
        <form className="" onSubmit={this.handleSubmit}>
          <div
            style={{ display: this.state.err }}
            className="alert alert-danger"
            role="alert"
          >
            <b>{this.state.error}</b>
          </div>
          <div className="alert-danger" id="resposta"></div>
          <Grid container spacing={3}>
            <Grid item xs={12} align='center'>
              <TextField
                required
                className="ml-3 mb-3 col-md-6 logoPInicial"
                id="cpfAccess"
                InputProps={{
                  readOnly: false
                }}
                fullWidth
                name="usuario"
                label="Usuario"
                variant="outlined"
                type="text"
                onChange={e => this.setState({ cpf: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} align='center'>
              <TextField
                required
                className="ml-3 mb-3 col-md-6 logoPInicial"
                id="passAccess"
                InputProps={{
                  readOnly: false
                }}
                fullWidth
                name="senha"
                label="Senha"
                variant="outlined"
                type="password"
                onChange={e => this.setState({ senha: e.target.value })}
              />
            </Grid>
            <button
              id="Acessar"
              className="btn btn-secondary col-md-6 logoPInicial text-center"
              type="submit"
            >
              <span className="fa fa-paper-plane" />
              &nbsp; Acessar
            </button>
          </Grid>
        </form >
      </Grid >
    );
  }
}
export default Acesso;

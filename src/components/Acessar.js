import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";

import api from "./../services/api";
import { TOKEN_KEY } from "./../services/auth";
import { isAuthenticated } from './../services/dados'

class Acesso extends Component {
  constructor() {
    super();
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
      try {

        const response = await api.post("/login/", { cpf, senha });
        localStorage.setItem(TOKEN_KEY, response.data.token);
        // this.props.history.push("/Loading");
        localStorage.removeItem("cpf");
        return (window.location = "/Vacina");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique seu C.P.F. e/ou sua senha",
          err: "block"
        });
      }
    }
  };

  render() {
    if (isAuthenticated() === true) {
      return (window.location = "/Vacina");
    }
    return (
      <div id="">
        <Header />
        <br />
        <section className="content">
          <form className="" onSubmit={this.handleSubmit}>
            <fieldset className="card">
              <legend className="card-header text-left legend-pma faq-btn-link">
                Informações importantes
            </legend>
              {/* <div className="text-center col-lg-4 offset-md-4 card-body"> */}
              <div className="col-md-12 campos-pma card-body logoPInicial">
                <div
                  style={{ display: this.state.err }}
                  className="alert alert-danger"
                  role="alert"
                >
                  <b>{this.state.error}</b>
                </div>
                <div className="alert-danger" id="resposta"></div>

                <TextField
                  required
                  className="ml-3 mb-3 col-md-6 logoPInicial"
                  id="cpfAccess"
                  InputProps={{
                    readOnly: false
                  }}
                  fullWidth
                  name="cpf"
                  label="C.P.F."
                  variant="outlined"
                  type="text"
                  onChange={e => this.setState({ cpf: e.target.value })}
                />

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
                <button
                  id="Acessar"
                  className="btn btn-secondary col-md-6 logoPInicial text-center" disabled
                  type="submit"
                >
                  <span className="fa fa-paper-plane" />
                &nbsp; Acessar
              </button>
              </div>
            </fieldset>
          </form>
        </section>
        <br />
        <Footer />
      </div>
    );
  }
}
export default Acesso;

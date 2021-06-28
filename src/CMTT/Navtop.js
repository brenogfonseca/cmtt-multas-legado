import React, { Component } from "react";
import { logout } from "../services/auth";

function sair() {
  logout();
}
class NavTop extends Component {
  render() {

    const teste = this.props.dados;
    var fotoPerfil = 'https://cdn.anapolis.go.gov.br/img/semFoto.png'
    return (
      <div
        className="hold-transition skin-blue bg-light sidebar-mini"
        id="panel"
      >

        <link rel="stylesheet" href="css/atletas/_all-skins.min.css" />
        <link rel="stylesheet" href="css/atletas/AdminLTE.min.css" />

        <header className="main-header">
          <a href="/Vacina" className="logo pma-logo">
            <span className="logo-mini">
              <b>PMA</b>
            </span>
            <span className="logo-lg">
              <b>VACINA</b>
            </span>
          </a>
          <nav className="navbar navbar-static-top">
            {/* Sidebar toggle button*/}
            <a
              href="!#"
              className="sidebar-toggle"
              data-toggle="push-menu"
              role="button"
            >
              <span className="sr-only">Toggle navigation</span>
            </a>
            {/* Navbar Right Menu */}
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                {/* User Account: style can be found in dropdown.less */}
                <li className="dropdown user user-menu">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <img
                      src={fotoPerfil}
                      className="user-image"
                      alt="fotoPerfilP"
                    />
                    <span className="hidden-xs">{teste.nome}</span>
                  </a>
                  <ul className="dropdown-menu">
                    {/* User image */}
                    <li className="user-header">
                      <img
                        src={fotoPerfil}
                        className="img-rounded"
                        alt="fotoPerfilG"
                      />
                      <p>
                        {teste.nome}
                        <small>Membro desde: {teste.dtCadastro}</small>
                      </p>
                    </li>
                    {/* Menu Body */}
                    {/* <li className="user-body">
                  <div className="row">
                    <div className="col-xs-4 text-center">
                      <a href="#">Followers</a>
                    </div>
                    <div className="col-xs-4 text-center">
                      <a href="#">Sales</a>
                    </div>
                    <div className="col-xs-4 text-center">
                      <a href="#">Friends</a>
                    </div>
                  </div>
                  {/* /.row 
                </li> */}
                    {/* Menu Footer*/}
                    <li className="user-footer">
                      <div className="pull-left">
                        <a href="/TrocarSenha" className="btn btn-default btn-flat">
                          Trocar Senha
                        </a>
                      </div>
                      <div className="pull-right">
                        <a
                          href="/"
                          onClick={sair}
                          className="btn btn-default btn-flat"
                        >
                          Sair
                        </a>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
export default NavTop;

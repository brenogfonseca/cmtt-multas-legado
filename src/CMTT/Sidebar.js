import React, { Component } from "react";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const teste = this.props.dados;
    var fotoPerfil = 'https://cdn.anapolis.go.gov.br/img/semFoto.png'

    function ListaEntregaSPADM(props) {
      var dados = props.lista
      if (dados.role === 'MEGA_ADM' || dados.role === 'ROLE_ADM' || dados.role === 'SUPER_ADM') {
        return (
          <li className="treeview">
            <a href="!#">
              <i className="fas fa-user-cog" />
              <span> Administração</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/CadastroGeralVacina">
                  <i className="fas fa-truck" /> <span>Cadastrar Lotes de Vacinas</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/CadastrarLotes">
                  <i className="fas fa-truck" /> <span>Distribuição da vacina</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/CadastrarUsuarios">
                  <i className="fas fa-user" /> <span>Cadastrar Usuários</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/CadastrarUnidades">
                  <i className="fas fa-user" /> <span>Cadastrar Unidades</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/GerarListaBairroData">
                  <i className="fas fa-truck" /> <span>Gerar Listas por Data/Bairros</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/GerarOcorrencia">
                  <i className="fas fa-user-edit" /> <span>Gerar Ocorrência Aplicador</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/ListaTipo">
                  <i className="fas fa-user-edit" /> <span>Listas Instituição/Lotação</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/ListaNaoVacinadosAcamados">
                  <i className="fas fa-user-edit" /> <span>Acamados não<br /> vacinados 1º Dose</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/ListaNaoVacinadosAcamados2dose">
                  <i className="fas fa-user-edit" /> <span>Acamados não <br /> vacinados 2º Dose</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/ListaVacinadosAcamados">
                  <i className="fas fa-user-edit" /> <span>Lista Acamados Vacinados</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>

              <li>
                <a href="/ListaVacinadosAcamadosGeral">
                  <i className="fas fa-user-edit" /> <span>Lista Acamados<br /> Vacinados Geral</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/ListaVacinadosGeral">
                  <i className="fas fa-user-edit" /> <span>Lista Vacinados Geral</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/ListaVacinadosAnterior0702">
                  <i className="fas fa-user-edit" /> <span>Vacinados Anterior a 07-02</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/ListaVacinados1Dose">
                  <i className="fas fa-user-edit" /> <span>Vacinados 1º Dose</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/ListaVacinados2Dose">
                  <i className="fas fa-user-edit" /> <span>Vacinados 2º Dose</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
            </ul>
          </li>
        )
      } else {
        return null
      }
    }

    function MenuNormal(props) {
      var dados = props.lista
      if (dados.role === 'ROLE_PROC') {
        return (
          <ul className="sidebar-menu" data-widget="tree">
            <li>
              <a href="/BuscaCadastro">
                <i className="fa fa-user" /> <span>Buscar Cadastro</span>
                <span className="pull-right-container"></span>
              </a>
            </li>
            <li>
              <a href="/PainelVacinas">
                <i className="fas fa-list" /> <span>Painel de Vacinas</span>
                <span className="pull-right-container"></span>
              </a>
            </li>
            <li>
              <a href="/DadosVacinas">
                <i className="fas fa-list" /> <span>Dados das Vacinas</span>
                <span className="pull-right-container"></span>
              </a>
            </li>
            <li>
              <a href="/RelatorioDiario">
                <i className="fas fa-list" /> <span>Relatorios Diarios</span>
                <span className="pull-right-container"></span>
              </a>
            </li>
          </ul>
        )
      }
      else {
        return (
          <ul className="sidebar-menu" data-widget="tree">
            <li>
              <a href="/Vacina">
                <i className="fa fa-home" />
                <span>Início</span>
              </a>
            </li>
            <li>
              <a href="/TrocarSenha">
                <i className="fa fa-user" /> <span>Trocar Senha</span>
                <span className="pull-right-container"></span>
              </a>
            </li>
            <li>
              <a href="/BuscaCadastro">
                <i className="fa fa-user" /> <span>Buscar Cadastro</span>
                <span className="pull-right-container"></span>
              </a>
            </li>
            <li>
              <a href="/BuscaCadastroBaixa">
                <i className="fa fa-user" /> <span>Buscar Cadastro BAIXAS</span>
                <span className="pull-right-container"></span>
              </a>
            </li>

            <li>
              <a href="/BuscaCadastroCPF">
                <i className="fas fa-shipping-fast" /> <span>Buscar numero CPF</span>
                <span className="pull-right-container"></span>
              </a>
            </li>
          </ul>
        )
      }
    }

    function ListaCadastros(props) {
      var dados = props.lista
      if (dados.role === 'MEGA_ADM' || dados.role === 'ROLE_CAD' || dados.role === 'ROLE_ADM' || dados.role === 'SUPER_ADM') {
        return (
          <ul className="sidebar-menu" data-widget="tree">
            <li>
              <a href="/Cadastro">
                <i className="fa fa-user" /> <span>Cadastro</span>
                <span className="pull-right-container"></span>
              </a>
            </li>
            <li>
              <a href="/CadastroSaude">
                <i className="fas fa-user-edit" /> <span>Cadastro Saude</span>
                <span className="pull-right-container"></span>
              </a>
            </li>
            <li>
              <a href="/CadastroAbrigo">
                <i className="fas fa-user-edit" /> <span>Cadastro Abrigo</span>
                <span className="pull-right-container"></span>
              </a>
            </li>
          </ul>
        )
      }
      else {
        return null
      }
    }

    function ListaMotoristas(props) {
      var dados = props.lista
      if (dados.role === 'MEGA_ADM' || dados.role === 'ROLE_ADM' || dados.role === 'SUPER_ADM') {
        return (
          <ul className="sidebar-menu" data-widget="tree">
            <li>
              <a href="/ConsultaListas">
                <i className="fas fa-shipping-fast" /> <span>Consultar Listas</span>
                <span className="pull-right-container"></span>
              </a>
            </li>
          </ul>
        )
      } else {
        return null
      }
    }
    function MEGA_ADM(props) {
      var dados = props.lista
      if (dados.role === 'MEGA_ADM') {
        return (
          <li className="treeview">
            <a href="!#">
              <i className="fas fa-user-cog" />
              <span> Super ADM</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/ListaNaoVacinados">
                  <i className="fas fa-file-medical" /> <span>Lista Não Vacinados</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/ListaVacinados">
                  <i className="fas fa-syringe" /> <span>Lista Vacinados</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/ListaRecusados">
                  <i className="fas fa-file-medical-alt" /> <span>Lista Recusados</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/Lista2Dose">
                  <i className="fas fa-file-medical-alt" /> <span>Lista 2º Dose</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/CadastrarUsuarios">
                  <i className="fas fa-user" /> <span>Cadastrar Usuários</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/CadastrarUnidades">
                  <i className="fas fa-user" /> <span>Cadastrar Unidades</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/EditarUnidades">
                  <i className="fas fa-user" /> <span>Editar Unidades</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/EditarUsuarios">
                  <i className="fas fa-user" /> <span>Editar Usuarios</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/EditarIdadesVacinacao">
                  <i className="fas fa-user" /> <span>Editar Idades Vacinação</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/EditarIdadesComorbidades">
                  <i className="fas fa-user" /> <span>Editar Idades Comorbidades</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>

              <li>
                <a href="/CadastroIdades">
                  <i className="fas fa-user" /> <span>Cadastrar Idades de vacina</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>

              <li>
                <a href="/Excel">
                  <i className="fas fa-clipboard-list" /> <span>Excel</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/Logs">
                  <i className="fas fa-clipboard-list" /> <span>Logs</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
            </ul>
          </li>
        )
      } else {
        return null
      }
    }

    function Vacinas(props) {
      var dados = props.lista
      if (dados.role === 'MEGA_ADM' || dados.role === 'ROLE_ADM' || dados.role === 'SUPER_ADM') {
        return (
          <li className="treeview">
            <a href="!#">
              <i className="fas fa-user-cog" />
              <span>Painel de Vacinas</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/CadastroGeralVacina">
                  <i className="fas fa-list" /> <span>Cadastro de Vacinas</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/PainelVacinas">
                  <i className="fas fa-list" /> <span>Painel de Vacinas</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
              <li>
                <a href="/DadosVacinas">
                  <i className="fas fa-list" /> <span>Dados das Vacinas</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
            </ul>
          </li>

        )
      }
      else {
        return null
      }
    }


    function ListaRelatorios(props) {
      var dados = props.lista
      if (dados.role === 'MEGA_ADM' || dados.role === 'ROLE_ADM' || dados.role === 'ROLE_UNI' || dados.role === 'SUPER_ADM') {
        return (
          <li className="treeview">
            <a href="!#">
              <i className="fas fa-user-cog" />
              <span> Relatorios</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="/RelatorioDiario">
                  <i className="fas fa-list" /> <span>Relatorios Diarios</span>
                  <span className="pull-right-container"></span>
                </a>
              </li>
            </ul>
          </li>

        )
      }
      else {
        return null
      }
    }

    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src={fotoPerfil}
                className="img-rounded"
                alt="User"
              />
            </div>
            <div className="pull-left info">
              <p>{teste.nome}</p>
              <span>
                <i className="fa fa-circle text-success" /> Online
              </span>
            </div>
          </div>
          {/* sidebar menu: : style can be found in sidebar.less */}
          <MenuNormal lista={teste} />
          <ListaCadastros lista={teste} />
          <ListaMotoristas lista={teste} />
          <ul className="sidebar-menu" data-widget="tree">
            <ListaEntregaSPADM lista={teste} />
            <MEGA_ADM lista={teste} />
            <ListaRelatorios lista={teste} />
            <Vacinas lista={teste} />
          </ul>
        </section>
        {/* /.sidebar */}
      </aside>
    );
  }
}
export default Sidebar;

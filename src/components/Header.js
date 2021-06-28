import React, { Component } from "react";
import {
  Modal,
  Button,
  Navbar,
  InputGroup,
  FormControl
} from "react-bootstrap";
// import mask from "jquery-mask-plugin";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      cpf: ""
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }


  handleChange = event => {
    this.setState({ cpf: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

  };

  render() {
    return (
      <header className="header">
        <link rel="stylesheet" href="/css/owl.carousel.css" />
        <div className="top-head">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="links">
                  <a href="/Acessar">Acesso</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="faixa-menu" />
        <div id="main-nav" className="">
          <div className="text-center col-md-12">
            <Navbar
              className="navbar-pma  navbar-expand-lg navbar-light"
              collapseOnSelect
              expand="lg"
              bg="light"
            >
              <Navbar.Brand className="navbar-brand logoPInicial" href="/Inicio">
                <img alt="logoNova" className="logoNova"
                  src="https://cdn.anapolis.go.gov.br/img/logos/sem_fundo/azuis/cmtt.png" />
              </Navbar.Brand>
              {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto text-center">
                  <Nav.Link href="/Inicio">Inicio</Nav.Link>
                  <Nav.Link href="/Calendario">Calendário</Nav.Link>
                  <Nav.Link href="/Resultados">Resultados</Nav.Link>
                  <Nav.Link href="/FotosVideos">Fotos e videos</Nav.Link>
                  <Nav.Link href="/FaleConosco">Fale Conosco</Nav.Link>
                </Nav>
              </Navbar.Collapse> */}
            </Navbar>
          </div>
        </div>
        <div style={{ textAlignLast: 'center' }} className="login-content pt-4 pb-4">
          <div className="col-md-12">
            <div className="row align-content-center">
              <div className="col-sm-12">
                <div className="msg-login">
                  <h6>Se você já é funcionario, clique para fazer login.</h6>
                  <a
                    style={{ color: '#FFF' }}
                    href="/Acessar"
                    className="col-md-4 pv-btn pv-btn-block pv-btn-primary btn-acessar"
                  >
                    Acessar
                  </a>
                </div>
              </div>

              {/* <div className="col-sm-12 col-lg-4 offset-lg-4">
                <div className="msg-login">
                  <h6>Se você ainda não tem cadastro, clique aqui.</h6>
                  <button
                    onClick={this.handleOpenModal}
                    className="pv-btn pv-btn-block pv-btn-primary btn-cadastrar"
                  >
                    Cadastrar
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showModal}
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Informe seu CPF
            </Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <div style={{ fontWeight: "bold" }} className="alert-danger" id="retorno"></div>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon3">C.P.F.:</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  id="cpf2"
                  required="true"
                  onKeyDown={this.mCPF}
                  onKeyUpCapture={this.validCpf}
                  name="cpf"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button id="cadastroButton" onClick={this.handleSubmit} style={{ display: "none" }} className="btn-secondary">
                Iniciar
              </Button>
              <Button onClick={this.handleCloseModal}>Close</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </header>
    );
  }
}

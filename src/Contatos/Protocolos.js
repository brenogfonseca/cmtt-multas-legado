import React, { Component } from "react";
import NavTop from "../Cadastro/Navtop";
import Footer from "../components/Footer";
import { getProtocolos } from "../services/dados";


class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            protocolo: '',
            cpf: ''
        };
        this.getEventos = this.getEventos.bind(this);
    }
    async getEventos() {
        let id = this.props.location.search
        var prot = id.replace("?", "")
        getProtocolos(prot).then(response => {
            this.setState({ protocolo: response.data.protocolo, cpf: response.data.cpf })
        })
    }
    componentDidMount() {
        this.getEventos();
    }

    render() {
        let protocolo = this.state.protocolo
        let cpf = this.state.cpf
        return (
            <div className="conteudo">
                <NavTop />
                <div className="home">
                    <span className="pma-text-center">Está com problemas para se cadastrar?
                 <a href="/Contato"> Clique Aqui</a></span>
                    <br />
                    <div id="printable" className='col-md-12'>
                        <h1 className="text-center">
                            Cadastro #IMUNIZAANÁPOLIS
          </h1>
                        <hr />
                        <div className="text-center mb-3">
                            <h3> Parabéns! Seu cadastro foi realizado com sucesso!<br />
                            O número do seu protocolo é:<br /></h3>
                            <h2><b>{protocolo}</b></h2><br />
                            <h3>No dia da vacinação, não se esqueça de levar um documento pessoal de identificação.<br /></h3>
                            <h1>CPF:<br /></h1>
                            <h2><b>{cpf}</b></h2><br />
                            <h2>Acompanhe as datas de vacinação através das redes oficiais da Prefeitura de Anápolis.</h2>
                        </div>
                    </div>
                    <button className="pv-btn pv-btn-primary col-md-6 pma-text-center"
                        onClick={() => window.print()}>IMPRIMIR</button>
                </div>
                <Footer />
            </div>
        );
    }
}
export default Panel;

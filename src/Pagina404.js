import React, { Component } from "react";
import { FooterNomLogged as Footer } from "./components/Footer";

class Covid19 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dadosUser: ''
        };
        this.getEventos = this.getEventos.bind(this);
    }

    getEventos() {
    }

    componentDidMount() {
        this.getEventos();
    }

    render() {

        return (
            <div className="skin-blue bg-light sidebar-mini" id="panel">
                <div className="wrapper">
                    <div className="content-wrapper">
                        <section className="content">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="box">
                                        <div className="box-header with-border">
                                            <h3 className="box-title">Ooops Pagina não encontrada</h3>
                                        </div>
                                        <img alt='404' className="" width="100%" src="https://cdn.anapolis.go.gov.br/img/404.svg" />
                                    </div>
                                </div >
                            </div>
                        </section>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Covid19;
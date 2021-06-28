import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    var data = new Date();
    var ano = data.getFullYear();
    return (
      <div className='footer2 mt-5'>
        <footer className="footer-pma footer2 col-md-12 mt-1" style={{
          paddingRight: '0px', paddingLeft: '0px'
        }} id="footer" >
          <div className="copy">
            <div className="faixa-footer" />
            <div className="text-center">
              <div className="row">
                <div className='col-sm-12 col-md-4 border-right-col text-left'>
                  <img className='img-responsive' alt='logosocial' src='https://cdn.anapolis.go.gov.br/img/logos/sem_fundo/brancas/cmtt.png' style={{ margin: '15px', width: '80%' }} />
                </div>
                <div className='col-md-4'>
                  <p className='text-center col-md-12' style={{ fontSize: '13px' }}>© Copyright {ano} | #IMUNIZAANÁPOLIS - Todos os Direitos Reservados
                    <br /><span style={{ fontStyle: 'oblique' }}>Secretaria de Comunicação, Eventos e Modernização</span>
                    <br /><span style={{ fontStyle: 'oblique' }}>Diretoria de Sistemas</span></p>
                </div>
                <div className='col-sm-12 col-md-4 text-right' style={{ marginLeft: '-10px', color: 'white' }}>
                  <b>Endereço</b>: R. Prof. Roberto Mange, 152
                  <br />Centro - Anápolis - GO
                  <br />Fone: (62)3902-2560
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export class FooterNomLogged extends Component {
  render() {
    var data = new Date();
    var ano = data.getFullYear();
    return (
      <div className='footer mt-5'>
        <footer className="footer-pma footer2 col-md-12 mt-1" style={{
          paddingRight: '0px', paddingLeft: '0px'
        }} id="footer" >
          <div className="copy">
            <div className="faixa-footer" />
            <div className="text-center">
              <div className="row">
                <div className='col-sm-12 col-md-4 border-right-col text-left'>
                  <img className='img-responsive' alt='logosocial' src='https://cdn.anapolis.go.gov.br/img/logos/sem_fundo/brancas/cmtt.png' style={{ margin: '15px', width: '80%' }} />
                </div>
                <div className='col-md-4'>
                  <p className='text-center col-md-12' style={{ fontSize: '13px' }}>© Copyright {ano} | CMTT - Todos os Direitos Reservados
                    <br /><span style={{ fontStyle: 'oblique' }}>Secretaria de Comunicação, Eventos e Modernização</span>
                    <br /><span style={{ fontStyle: 'oblique' }}>Diretoria de Sistemas</span></p>
                </div>
                <div className='col-sm-12 col-md-4 text-right' style={{ marginLeft: '-10px', color: 'white' }}>
                  <b>Endereço</b>: R. Prof. Roberto Mange, 152
                  <br />Centro - Anápolis - GO
                  <br />Fone: (62)3902-2560
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
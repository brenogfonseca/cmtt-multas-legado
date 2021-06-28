import React, { Component } from "react";
/* eslint eqeqeq: "off", "no-unused-vars": "off", curly: "error" */

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dadosEntregues: [],
      dadosCount: [],
      alert: {
        status: '',
        message: ''
      }
    };
    this.getEventos = this.getEventos.bind(this);
  }

  async getEventos() {
  }

  componentDidMount() {
    this.getEventos();
  }
  render() {

    return (
      <div className="home">
        <div className="col-md-12 text-center mt-2">
          <hr />
          <div className="row">
            <div className="col-md-12">
              <p className="text-center">

              </p>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

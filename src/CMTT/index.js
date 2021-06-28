import React, { Component } from "react";
import Sidebar from "./Sidebar";
import NavTop from "./Navtop";
import Footer from "../components/Footer";
import Content from "./Content";
import { getUsers } from "../services/dados"


class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: [],
    };
    this.getEventos = this.getEventos.bind(this);
  }

  async getEventos() {
    // await getUsers().then(response2 => {
    //   this.setState({
    //     dados: response2.data
    //   })
    //   if (response2.data.acesso === 0) {
    //     return (window.location = "/TrocarSenha");
    //   }


    // });
  }

  componentDidMount() {
    this.getEventos();
  }
  render() {
    return (
      <div className="skin-blue bg-light sidebar-mini" id="panel">
        <div className="wrapper">
          <NavTop dados={this.state.dados} />
          <Sidebar dados={this.state.dados} />
          <Content dados={this.state.dados} />
          <Footer />
        </div>
      </div>
    );
  }
}
export default Panel;

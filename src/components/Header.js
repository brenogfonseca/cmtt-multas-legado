import React, { Component } from "react";
// import mask from "jquery-mask-plugin";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      cpf: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }


  handleChange = event => {
  };

  handleSubmit = event => {

  };

  render() {
    return (
      <div></div>
    );
  }
}

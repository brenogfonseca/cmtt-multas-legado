import React, { Component } from "react";
class Logs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dados: [],
            dadosUser: [],
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
                <h1>
                    Logs
                </h1>

            </div >
        );
    }
}
export default Logs
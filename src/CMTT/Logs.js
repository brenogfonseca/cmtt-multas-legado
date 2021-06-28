import React, { Component } from "react";
import Sidebar from "./Sidebar";
import NavTop from "./Navtop";
import Footer from "../components/Footer";
import { getUsers } from "../services/dados"

const $ = require('jquery');
$.DataTable = require('datatables.net-bs4');
require('jquery');
require('datatables.net-bs4');
require('datatables.net-buttons-bs4');
require('datatables.net-buttons/js/buttons.html5.js');
require('datatables.net-buttons/js/buttons.print.js');
require('datatables.net-responsive-bs4');

const columns = [
    {
        title: 'Usuario',
        width: "auto",
        data: 'usuario'
    },
    {
        title: 'LOG',
        width: "auto",
        data: 'log'
    },
    {
        title: 'Data',
        width: "auto",
        data: 'dt_log'
    },
];

function DataTable(props) {
    var table = $('#table').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            {
                extend: 'pdf', className: 'btn-pdf', download: 'open', text: 'PDF'
            },
            { extend: 'excel', className: 'btn-excel', download: 'open', text: 'Excel' },
            { extend: 'print', className: 'btn-print', text: 'Imprimir' }
        ],
        data: props.cadastros,
        columns,
        destroy: true,
        ordering: false,
        'language': {
            'lengthMenu': 'Mostar _MENU_ Registro por Pagina',
            'zeroRecords': 'Nada foi encontrado',
            'info': 'Mostrando _PAGE_ de _PAGES_',
            'infoEmpty': 'Não foram encontrados Registros',
            'infoFiltered': '(Filtrados de _MAX_ do Total)',
            'search': 'Buscar:',
            "paginate": {
                "first": "Primeiro",
                "last": "Ultimo",
                "next": "Proximo",
                "previous": "Anterior"
            },
        },
        "rowCallback": function (row, data) {

            // $('td:eq(1)', row).css('display', '')
            $('td:eq(0)', row).css('display', '')
        },
        "headerCallback": function (thead, data, display) {

            $('th:eq(0)', thead).css('display', '')
            // $('th:eq(1)', thead).css('display', '')
        },

    });
    return (
        <div>
            <table id="table" className="data-table-wrapper form-center table table-bordered display table-action wrap dataTable no-footer" style={{ width: 100 + "%" }} refs="main"></table>
        </div>);
}



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
        getUsers().then(response2 => {
            this.setState({ dadosUser: response2.data })
        });
    }

    componentDidMount() {
        this.getEventos();
    }

    render() {
        return (
            <div className="skin-blue bg-light sidebar-mini" id="panel">
                <div className="wrapper">
                    <NavTop dados={this.state.dadosUser} />
                    <Sidebar dados={this.state.dadosUser} />
                    <br />
                    <div className="content-wrapper">
                        {/* Content Header (Page header) */}
                        <section className="content-header">
                            <h1>
                                Logs
                            </h1>
                            <ol className="breadcrumb">
                                <li>
                                    <a href="/Vacina">
                                        <i className="fa fa-dashboard" />Início</a>
                                </li>
                            </ol>
                        </section>
                        {/* Main content */}
                        <section className="content">
                            <DataTable
                                cadastros={this.state.dados} />
                        </section>
                    </div >
                    <Footer />
                </div >
            </div >
        );
    }
}
export default Logs
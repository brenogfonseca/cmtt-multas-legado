import React, { useState } from "react";
import moment from "moment";
import { connect } from 'react-redux';
import * as actions from '../actions'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import SearchIcon from '@material-ui/icons/Search';
import { base64Img } from "../components/logo";
import { DataGrid } from "@material-ui/data-grid";
/* eslint eqeqeq: "off", "no-unused-vars": "off", curly: "error" */



function PrintDocument(props) {
    const doc = new jsPDF()
    props.map(prop => {
        prop.dt_infracao = moment(prop.dt_infracao).format('DD/MM/YYYY')
        prop.venc_notificacao = moment(prop.venc_notificacao).format('DD/MM/YYYY')
        if (prop.tipo_notificacao === 2) { prop.tipo_notificacao = '2 - Penalidade' }
        else if (prop.tipo_notificacao === 1) {
            prop.tipo_notificacao = '1 - Autuação'
            prop.valor_infracao = '-'
        }
        return ''
    })

    doc.autoTable({
        didDrawPage: function (data) {
            doc.addImage(base64Img, 'PNG', 70, 10, 80, 15)
        },
        startY: 30,
        theme: 'grid',
        styles: { fontSize: 9 },
        headStyles: { fillColor: [15, 76, 129] }, // European countries centered
        body: props,
        margin: { top: 30 },
        columns: [
            { header: 'Placa', dataKey: 'placa' },
            { header: 'Auto de Infração', dataKey: 'auto' },
            { header: 'Tipo Notificação', dataKey: 'tipo_notificacao' },
            { header: 'Dt. Infração', dataKey: 'dt_infracao' },
            { header: 'Cod. Infração', dataKey: 'cod_infracao' },
            { header: 'Cod. Autuador', dataKey: 'autuador' },
            { header: 'Dt. Vencimento', dataKey: 'venc_notificacao' },
            { header: 'Valor Infração', dataKey: 'valor_infracao' },
        ],
    })
    doc.save('table.pdf')
}

const colunas = [
    {
        field: 'placa',
        headerName: 'Placa',
        width: 120,
    },
    {
        field: 'auto',
        headerName: 'Auto',
        width: 120,
    },
    {
        field: 'tipo_notificacao',
        headerName: 'Notificação',
        width: 160,
        renderCell: (params) => {
            if (params.row.tipo_notificacao == 2) { return '2- Penalidade' }
            else if (params.row.tipo_notificacao == 1) { return '1 - Autuação' }
        },
    },
    {
        field: 'dt_infracao',
        headerName: 'Data',
        width: 120,
        renderCell: (params) => `${moment(params.getValue(params.id, 'dt_infracao')).format('DD/MM/YYYY')}`,
    },
    {
        field: 'cod_infracao',
        headerName: 'Infração',
        width: 140,
    },
    {
        field: 'autuador',
        headerName: 'Autuador',
        width: 140,
    },
    {
        field: 'venc_notificacao',
        headerName: 'Vencimento',
        width: 170,
        renderCell: (params) => `${moment(params.getValue(params.id, 'venc_notificacao')).format('DD/MM/YYYY')}`,
    },
    {
        field: 'vl_notif',
        headerName: 'Valor',
        width: 120,
        renderCell: (params) => {
            if (params.row.tipo_notificacao == 2) { return params.row.valor_infracao }
            else { return '-' }
        },
    },
    {
        field: 'id',
        headerName: 'VER',
        width: 120,
        renderCell: (params) => {
            let teste = `${moment(params.getValue(params.id, 'dt_cadastro')).format('YYYYMMDD')}`
            return <a target='_blank' href={'https://cdn.anapolis.go.gov.br/docs-cmtt/' + teste + '.pdf'}><SearchIcon /></a>
        },
    },
];

function DataGridDemo(props) {
    const [search, setSearch] = useState('')
    React.useEffect(() => {
        props.getRelatorioData()
    }, [])
    if (props.relatorios === undefined || props.relatorios === '') {
        return null
    }
    const rows = props.relatorios

    const rowsFiltrados = (state) => {
        return rows.filter((row) =>
            row.placa.toLowerCase().includes(search.toLowerCase()) ||
            row.auto.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <div>
            <div>
                <button className='btn btn-pdf' onClick={() => PrintDocument(props.relatorios)}>PDF</button>
                <input className='form-control' placeholder='Pesquisar Placa ou Auto de Infração' value={search} onChange={(e) => setSearch(e.target.value)}></input>
            </div>
            <hr />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rowsFiltrados()}
                    columns={colunas}
                    pageSize={5}
                />
            </div>
        </div >
    );
}

const mapStateToProps = state => ({
    relatorios: state.relatorios.relatorios
})
export default connect(mapStateToProps, actions)(DataGridDemo)
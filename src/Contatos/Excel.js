import React from "react";
import * as XLSX from 'xlsx';
import { apiBusca } from "../services/api";
import { getCadastradosCPF, token, getTipoCad } from "../services/dados";
import { Toast, apareceAlert } from "../components/Alert"
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";


function TabelaExcel(props) {
    var dados = props.dados
    return dados.map(function (item, i) {

        var splitar = item.cargo
        let lotacao, cargo
        if (splitar == '' || splitar == null) {
            lotacao = item.lotacao
            cargo = item.cargo
        } else {
            var divide = splitar.split(" – ")
            if (divide.length > 1) {
                lotacao = divide[0]
                cargo = divide[1]
            } else {
                lotacao = item.lotacao
                cargo = item.cargo
            }
        }
        var cadastro
        return (
            <tr key={i}>
                <td>{item.nome}</td>
                <td>{item.cpf}</td>
                <td>{lotacao}</td>
                <td>{cargo}</td>
                <td>{item.dt_nascimento}</td>
                <td>{item.nome_mae}</td>
                <td>{item.telefone}</td>
                <td>{cadastro}</td>
            </tr>
        )
    })

}

class ExcelToJson extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            file: "",
            json: [],
            tipos: [],
            tipo: ''
        };
        this.getCpf = this.getCpf.bind(this)
        this.SendForm = this.SendForm.bind(this)
    }

    async getEventos() {
        getTipoCad().then(response => {
            this.setState({ tipos: response.data })
        })
    }

    handleClick(e) {
        this.refs.fileUploader.click();
    }

    async getCpf(cpf) {
        let id = window.btoa(cpf)
        return await getCadastradosCPF(id).then(response3 => {
            this.setState({ [cpf]: response3.data })
        })

    }

    filePathset(e) {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        this.setState({ file });
    }

    readFile() {
        var f = this.state.file;
        var name = f.name;
        console.log(name)
        const reader = new FileReader();
        reader.onload = (evt) => {
            // evt = on_file_select event
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            /* Update state */
            // console.log("Data>>>" + data);// shows that excel data is read
            this.convertToJson(data); // shows data in json format
        };
        reader.readAsBinaryString(f);
    }

    async convertToJson(csv) {
        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {

                obj[headers[j]] = currentline[j];
            }
            if (obj.cpf) {
                var cpf = obj.cpf.trim()

                this.getCpf(cpf)
                var cpfCad = this.state[cpf]
                console.log(cpfCad)
                if (cpfCad == 0) {
                    result.push(obj);
                    this.setState({ json: result })
                }
            }
            // obj.cpf && result.push(obj);
        }
        // console.log(result)
        // result.map(item => {
        //     if (item.nome == '' || item.cpf == '') {
        //         return null
        //     } else {
        //         var cpf = item.cpf
        //         this.getCpf(cpf)
        //         this.setState({ json: result })
        //         return result;
        //     }
        // })
        //return result; //JavaScript object
        //JSON
    }

    async SendForm(event) {
        event.preventDefault()
        const { json, tipo } = this.state
        var raw = { json, tipo }
        console.log(raw)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token)

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        await apiBusca.post("/cadastros/formCadExcel", requestOptions)
            .then(response => {
                this.setState({
                    alert: {
                        status: response.data.response.status,
                        message: response.data.response.result
                    }
                })
                let propis = this.props
                if (this.state.alert.status === 200) {
                    Toast.fire({
                        icon: 'success',
                        title: this.state.alert.message
                    }).then(function () {
                        apareceAlert(propis)
                    })

                }
                else if (this.state.alert.status === 201) {
                    Toast.fire({
                        icon: 'error',
                        title: this.state.alert.message
                    })
                }
            })

            .catch(error => {
                this.setState({
                    alert: {
                        status: 201,
                        message: "Contate o Desenvolvedor do Sistema! cadastrarUnidades()->BAD_CONFIG"
                    }
                })
            })
    }

    componentDidMount() {
        this.getEventos();
    }

    render() {
        var dados = this.state.json
        return (
            <div>
                <input
                    type="file"
                    id="file"
                    ref="fileUploader"
                    onChange={this.filePathset.bind(this)}
                />
                <div className="col-md-6">
                    <button className="btn btn-pv btn-danger"
                        onClick={() => {
                            this.readFile();
                        }}
                    >
                        Carregar Arquivo Excel
        </button>
                </div>
                <form id="wizard" onSubmit={this.SendForm}>
                    <div className="col-md-6">
                        <Autocomplete
                            id="bairro2"
                            options={this.state.tipos}
                            getOptionLabel={(option) => option.tipo}
                            onChange={(option, value) => {
                                if (value != null) {
                                    this.setState({ tipo: value.tipo })
                                }
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    fullWidth
                                    id="bairro"
                                    label="Tipo"
                                    required
                                    name="bairro"
                                    variant="outlined" />}
                        />
                    </div>
                    <button className='btn btn-pv ' style={{ marginLeft: 10 + 'px' }}                >
                        Cadastrar
        </button>
                </form>
                <table id="table" className="data-table-wrapper form-center table table-bordered display table-action wrap dataTable no-footer" style={{ width: 100 + "%" }}
                    refs="main">
                    <thead>
                        <tr className="title_table">
                            <th>NOME COMPLETO</th>
                            <th>CPF</th>
                            <th>LOTAÇÃO</th>
                            <th>CARGO</th>
                            <th>DATA NASCIMENTO</th>
                            <th>NOME DA MÃE</th>
                            <th>TELEFONE</th>
                            <th>ENDEREÇO</th>
                            <th>CEP</th>
                            {/* <th>CADASTRADO</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* <TabelaExcel buscaCpf={this.getCpf} dados={this.state.json} /> */}
                        {dados.map(((item, i) => {
                            var splitar = item.cargo
                            let lotacao, cargo
                            if (splitar == '' || splitar == null) {
                                lotacao = item.lotacao
                                cargo = item.cargo
                            } else {
                                var divide = splitar.split(" – ")
                                if (divide.length > 1) {
                                    lotacao = divide[0]
                                    cargo = divide[1]
                                } else {
                                    lotacao = item.lotacao
                                    cargo = item.cargo
                                }
                            }
                            var cadastro = item.cpf
                            var cadastrado, styled
                            if (cadastro == '') {
                                return ''
                            }
                            else {
                                if (this.state[cadastro] === 1) {
                                    return ''
                                } else {
                                    return (
                                        <tr key={i}>
                                            <td>{item.nome}</td>
                                            <td>{item.cpf}</td>
                                            <td>{lotacao}</td>
                                            <td>{cargo}</td>
                                            <td>{item.dt_nascimento}</td>
                                            <td>{item.nome_mae}</td>
                                            <td>{item.telefone}</td>
                                            <td>{item.endereco}</td>
                                            <td>{item.cep}</td>
                                            {/* <td>{cadastrado}</td> */}
                                        </tr>
                                    )
                                }
                            }
                        }))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ExcelToJson;

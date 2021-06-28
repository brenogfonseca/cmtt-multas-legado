import React from "react";
import { human2ts, } from "../services/dados"
import { Button } from "react-bootstrap";

function MarcaEntrega(props) {
    var userDados = props.dadosUser
    if (userDados.role === 'SUPER_ADM' || userDados.role === 'MEGA_ADM' || userDados.role === 'ROLE_ADM' || userDados.role === 'ROLE_UNI') {
        var vacina1
        var dataEntrega = props.dados.entrega
        var funcao
        var vacina2
        var dataEntrega2 = props.dados.entrega2vacina
        var funcao2
        if (props.dados.entrega === null) {
            vacina1 = 'pma-2vacina'
            dataEntrega = 'Não Vacinado'
            funcao = <Button onClick={props.EntregaConf} className={vacina1}>1º</Button>
        } else if (props.dados.entrega != null) {
            vacina1 = 'pma-1vacina'
            funcao = <Button className={vacina1}>1º</Button>
        }
        //2º Vacina
        if (props.dados.entrega2vacina === null) {
            if (props.dados.segundaSolicitacao === null) {
                vacina2 = 'pma-3vacina'
                dataEntrega2 = '2º Vacina não solicitada'
                funcao2 = <Button className={vacina2}>2º</Button>
            } else {
                vacina2 = 'pma-2vacina'
                dataEntrega2 = 'Não Vacinado'
                funcao2 = <Button onClick={props.EntregaConf2} className={vacina2}>2º</Button>
            }
        } else if (props.dados.entrega != null) {
            vacina2 = 'pma-1vacina'
            funcao2 = <Button className={vacina2}>2º</Button>
        }
        return (
            <tbody>
                <tr key={vacina1}>
                    <td>{funcao}</td>
                    <td className={vacina1}>{dataEntrega}</td>
                </tr>

                <tr key={vacina2}>
                    <td>{funcao2}</td>
                    <td className={vacina2}>{dataEntrega2}</td>
                </tr>
            </tbody>
        )
    } else {
        return null
    }
}

export function PainelADM(props) {
    var data = new Date();
    var mes
    // Guarda cada pedaço em uma variável
    var dia = data.getDate();           // 1-31
    var mesn = data.getMonth();          // 0-11 (zero=janeiro)
    var ano4 = data.getFullYear();       // 4 dígitos
    var hora = data.getHours();          // 0-23
    //var hora = 11
    var min = data.getMinutes();        // 0-59
    if (mesn < 9) { mes = '0' + (mesn + 1) }
    else { mes = (mesn + 1) }

    // Formata a data e a hora (note o mês + 1)
    var str_data = ano4 + '-' + mes + '-' + dia;
    //var str_dataFormat = dia + '/' + mes + ' / ' + ano4;
    var str_hora = hora + ':' + min
    //var hojeBR = str_dataFormat + ' ' + str_hora
    var hojeFormat = str_data + ' ' + str_hora
    var solic2 = props.dados.segundaSolicitacao
    //
    var dtvacina2
    var vacina2
    var funcao2vacina

    if (solic2 != null) {
        vacina2 = 'pma-1vacina'
        funcao2vacina = <Button className={vacina2}>2º</Button>
        dtvacina2 = props.dados.segundaSolicitacao

    } else {
        var hoje = new Date(hojeFormat)
        var date2vacina = new Date(props.dados.comp2vacina)
        var dtHoje = human2ts(hoje)
        var vacina2dt = human2ts(date2vacina)

        if (props.dados.data2vacina === null) {
            vacina2 = 'pma-3vacina';
            dtvacina2 = props.dados.data2vacina
            funcao2vacina = <Button className={vacina2}>2º</Button>
        }
        else if (dtHoje >= vacina2dt) {
            vacina2 = 'pma-2vacina'
            funcao2vacina = <Button onClick={props.LiberaConf} className={vacina2}>2º</Button>
            dtvacina2 = props.dados.data2vacina
        }
        else if (dtHoje < vacina2dt) {

            vacina2 = 'pma-3vacina'
            funcao2vacina = <Button className={vacina2}>2º</Button>
            dtvacina2 = props.dados.data2vacina
        }
    }
    let BotaoRecusa
    let botaoAplicador
    let vacina_recusa
    let divIdade
    var teste = props.vacinaIdade[props.dados.tipo_cadastro]
    if (props.dados.idade < (teste ? teste.idade_min : '') && props.dados.vacinado == 'Não') {
        botaoAplicador = ''
    }
    else if (props.dados.aplicador === '-') {
        botaoAplicador = <Button onClick={props.aplicador} className='btn btn-success ml-3' style={{ color: 'white', fontWeight: '600' }}>
            Inserir Aplicador
                    </Button>
    }
    else {
        botaoAplicador = ''
    }
    if (props.dados.vacina_recusada === 'Não') {
        vacina_recusa = 0
        BotaoRecusa = <Button onClick={props.vacinaRecusada} className='btn btn-danger ml-3' style={{ color: 'white', fontWeight: '600' }}>
            Vacina Recusada
                    </Button>
    }
    else if (props.dados.vacina_recusada === 'Sim') {
        vacina_recusa = 1
        BotaoRecusa = <Button onClick={props.aceitarVacina} className='btn btn-success ml-3' style={{ color: 'white', fontWeight: '600' }}>
            Aceitar Vacina
                    </Button>
    }
    if (props.dados.vacina_recusada === 'Sim') {
        return (
            <div className="col-md-12 row">
                <div className="col-md-12 mt-3">
                    <Button onClick={props.MarcaReacao} className='btn btn-warning' style={{ color: 'white', fontWeight: '600' }}>
                        Inserir Observação
                    </Button>
                    {BotaoRecusa}
                </div>
                <div className="col-md-12 mt-3">
                    <legend className='text-center btn-danger'>VACINA RECUSADA</legend>
                </div>
            </div>
        )
    }

    else if (props.dados.idade < (teste ? teste.idade_min : '') && props.dados.vacinado == 'Não') {

        return (
            <div className="col-md-12 row">
                <div className="col-md-12 mt-3">
                    <Button onClick={props.MarcaReacao} className='btn btn-warning' style={{ color: 'white', fontWeight: '600' }}>
                        Inserir Observação
                    </Button>
                    {botaoAplicador}
                    {BotaoRecusa}
                    {divIdade}
                </div>
                <div className="col-md-12 mt-3">
                    {/* <legend className='text-center btn-danger'>IDADE AINDA NÃO LIBERADA PARA VACINAÇÃO</legend> */}
                    <legend className='text-center btn-danger'>PERFIL NÃO LIBERADO - AGUARDANDO VACINA.</legend>
                </div>
            </div>
        )
    }
    else if (props.dados.aplicador === '-') {
        return (
            <div className="col-md-12 row">
                <div className="col-md-12 mt-3">
                    <Button onClick={props.MarcaReacao} className='btn btn-warning' style={{ color: 'white', fontWeight: '600' }}>
                        Inserir Observação
                    </Button>
                    {botaoAplicador}
                    {BotaoRecusa}
                    {divIdade}
                </div>
                <div className="col-md-12 mt-3">
                    <legend className='text-center btn-danger'>PACIENTE SEM APLICADOR CADASTRADO</legend>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="col-md-12 row">
                <div className="col-md-12 mt-3">
                    <Button onClick={props.MarcaReacao} className='btn btn-warning' style={{ color: 'white', fontWeight: '600' }}>
                        Inserir Observação
                    </Button>
                    {botaoAplicador}
                    {BotaoRecusa}
                </div>
                <div className="col-md-6 mt-3">
                    <table style={{ width: 100 + '%' }} className="display table-bordered table">
                        <thead>
                            <tr>
                                <th style={{ fontWeight: "bolder" }}>Solicitação</th>
                                <th style={{ fontWeight: "bolder" }}>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Button className='pma-1vacina'>1º</Button></td>
                                <td className='pma-1vacina'>{props.dados.primeiraSolicitacao}</td>
                            </tr>
                            <tr>
                                <td>{funcao2vacina}</td>
                                <td className={vacina2}>{dtvacina2}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6 mt-3">
                    <table style={{ width: 100 + '%' }} className="display table-bordered table">
                        <thead>
                            <tr>
                                <th style={{ fontWeight: "bolder" }}>Vacina</th>
                                <th style={{ fontWeight: "bolder" }}>Data</th>
                            </tr>
                        </thead>
                        <MarcaEntrega
                            dadosUser={props.dadosUser}
                            dados={props.dados}
                            EntregaConf={props.EntregaConf}
                            EntregaConf2={props.EntregaConf2}
                        />
                    </table >
                </div >
            </div>
        )
    }
}

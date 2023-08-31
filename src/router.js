import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Acessar from "./components/Acessar";
import Pagina404 from "./Pagina404"
import ImportPenalidades from './CMTT/importPenalidades.js'
import {ImportAutuacao} from './CMTT/importAutuacao.js'
import BuscaPlaca from './CMTT/BuscaPlaca.js'
import BuscaDatas from './CMTT/BuscaDatas'
import PrivateRoute from './services/PrivateRoute'
import NormalRoute from './services/NormalRoute'
import Logs from './CMTT/Logs'
import Inicial from './CMTT/Inicial'
import Formularios from './CMTT/Formularios'

// import { roleAdm, roleUsr } from "./roles/Base";
import RelatorioDiario from "./CMTT/RelatorioDiario";
// import Dashboard from "./components/DashBoard";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <NormalRoute exact path="/"><Inicial /></NormalRoute>
            <NormalRoute path="/Acessar"><Acessar /></NormalRoute>
            <NormalRoute path="/buscaPlaca"><BuscaPlaca /></NormalRoute>
            <NormalRoute path="/buscaDatas"><BuscaDatas /></NormalRoute>
            <PrivateRoute path="/importPenalidades"><ImportPenalidades /></PrivateRoute>
            <PrivateRoute path="/importAutuacao"><ImportAutuacao /></PrivateRoute>
            <PrivateRoute path="/logs"><Logs /></PrivateRoute>
            <NormalRoute path="/RelatorioDiario"><RelatorioDiario /></NormalRoute>
            <NormalRoute path="/Formularios"><Formularios /></NormalRoute>
            <Route path='*' component={Pagina404} />
        </Switch>
    </BrowserRouter>
);
export default Routes;


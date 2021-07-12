import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Acessar from "./components/Acessar";
import Pagina404 from "./Pagina404"
import ImportPenalidades from './CMTT/importPenalidades.js'
import ImportAutuacao from './CMTT/importAutuacao.js'
import BuscaPlaca from './CMTT/BuscaPlaca.js'
import PrivateRoute from './services/PrivateRoute'
import NormalRoute from './services/PrivateRoute'

import { roleAdm, roleUsr } from "./roles/Base";
import RelatorioDiario from "./CMTT/RelatorioDiario";
import Dashboard from "./components/DashBoard";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/"><Dashboard /></Route>
            <Route path="/Acessar" component={Acessar} />
            <PrivateRoute path="/buscaPlaca"><BuscaPlaca /></PrivateRoute>
            <PrivateRoute path="/importPenalidades"><ImportPenalidades /></PrivateRoute>
            <PrivateRoute path="/importAutuacao"><ImportAutuacao /></PrivateRoute>
            <NormalRoute path="/RelatorioDiario"><RelatorioDiario /></NormalRoute>
            <Route path='*' component={Pagina404} />
        </Switch>
    </BrowserRouter>
);
export default Routes;


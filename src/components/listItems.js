import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { useHistory } from 'react-router-dom';
import ReorderIcon from '@material-ui/icons/Reorder';
import BallotIcon from '@material-ui/icons/Ballot';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import { isAuthenticated } from '../services/dados';
import { logout } from '../services/auth';


export function MainListItems() {
  return (
    <div>
      <ListItem button onClick={() => window.location = ('/')} >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Início" />
      </ListItem>
      <ListItem button onClick={() => window.location = ('/RelatorioDiario')}>
        <ListItemIcon>
          <ReorderIcon />
        </ListItemIcon>
        <ListItemText primary="Relatório Diário" />
      </ListItem>
      <ListItem button onClick={() => window.location = ('/importPenalidades')} >
        <ListItemIcon>
          <BallotIcon />
        </ListItemIcon>
        <ListItemText primary="Importar Penalidades" />
      </ListItem>
      <ListItem button onClick={() => window.location = ('/importAutuacao')} >
        <ListItemIcon>
          <BallotIcon />
        </ListItemIcon>
        <ListItemText primary="Importar Autuações" />
      </ListItem>
      <ListItem button onClick={() => window.location = ('/BuscaDatas')} >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Buscar por Datas" />
      </ListItem>
      <ListItem button onClick={() => window.location = ('/BuscaPlaca')} >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Buscar por Placa" />
      </ListItem>
      <ListItem button onClick={() => window.location = ('/Logs')} >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="LOGS" />
      </ListItem>
    </div>
  )
};

export function SecondaryListItems() {
  var logged
  if (isAuthenticated() === true) {
    logged = <div>
      <ListItem button onClick={() => logout()} >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
    </div >
  } else {
    logged = <div>
      <ListItem button onClick={() => window.location = "/Acessar"} >
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        <ListItemText primary="Acessar" />
      </ListItem>
    </div >
  }
  return (
    <div>
      <ListSubheader inset>Acesso Restrito</ListSubheader>
      {logged}
    </div >
  )
};
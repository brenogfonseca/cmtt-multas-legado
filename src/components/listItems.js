import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useHistory } from 'react-router-dom';
import ReorderIcon from '@material-ui/icons/Reorder';
import BallotIcon from '@material-ui/icons/Ballot';


export function MainListItems() {
  const history = useHistory()
  return (
    <div>
      <ListItem button onClick={() => history.push('/')} >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Início" />
      </ListItem>
      <ListItem button onClick={() => history.push('/RelatorioDiario')}>
        <ListItemIcon>
          <ReorderIcon />
        </ListItemIcon>
        <ListItemText primary="Relatório Diário" />
      </ListItem>
      <ListItem button onClick={() => history.push('/importPenalidades')} >
        <ListItemIcon>
          <BallotIcon />
        </ListItemIcon>
        <ListItemText primary="Importar Penalidades" />
      </ListItem>
      <ListItem button onClick={() => history.push('/importAutuacao')} >
        <ListItemIcon>
          <BallotIcon />
        </ListItemIcon>
        <ListItemText primary="Importar Autuações" />
      </ListItem>
      <ListItem button onClick={() => history.push('/importAutuacoes')} >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Table" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem>
    </div>
  )
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import './dashboard.css'


export function FooterNomLogged(props) {
  return (
    <div >
      <CssBaseline />
      <footer className={props.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">My sticky footer can be found here.</Typography>
        </Container>
      </footer>
    </div>
  );
}


export function Footer(props) {
  var data = new Date();
  var ano = data.getFullYear();
  return (
    <footer className={props.css}>
      <div className="dashboard-footer"  >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} >
            <img alt='logosocial' src='https://cdn.anapolis.go.gov.br/img/logos/sem_fundo/brancas/cmtt.png' style={{ margin: '15px', width: '80%' }} />
          </Grid>
          <Grid item xs={12} sm={5} align="center" >
            {/* <ThemeProvider theme={theme}> */}
            <Typography variant="subtitle1"  >
              © Copyright {ano} | #IMUNIZAANÁPOLIS - Todos os Direitos Reservados
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Secretaria de Comunicação, Eventos e Modernização
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Diretoria de Sistemas
            </Typography>
            {/* </ThemeProvider> */}
          </Grid>
          <Grid item xs={12} sm={3} align="center" >
            <Typography variant="subtitle1" color="inherit">
              <b>Endereço</b>: R. Prof. Roberto Mange, 152
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Centro - Anápolis - GO
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Fone: (62)3902-2560
            </Typography>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}

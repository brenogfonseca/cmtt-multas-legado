import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export function Footer(props) {
  var data = new Date();
  var ano = data.getFullYear();
  return (
    <footer className={props.css} >
      <div className="dashboard-footer" style={{ backgroundSize: 'contain', backgroundImage: 'url("https://novo.anapolis.go.gov.br/wp-content/themes/prefeitura-anapolis/assets/images//monumentos-anapolis.png")' }} >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} >
            <img alt='logosocial' src='https://cdn.anapolis.go.gov.br/img/logos/sem_fundo/brancas/cmtt.png' style={{ margin: '15px', width: '80%' }} />
          </Grid>
          <Grid item xs={12} sm={5} align="center" >
            {/* <ThemeProvider theme={theme}> */}
            <Typography variant="subtitle1"  >
              © Copyright {ano} | #CMTT - Todos os Direitos Reservados
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Assessoria de Inovação
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Secretaria de Comunicação, Eventos e Modernização
            </Typography>
            {/* </ThemeProvider> */}
          </Grid>
          <Grid item xs={12} sm={3} align="center" >
            <Typography variant="subtitle1" color="inherit">
              <b>Endereço</b>: Av. Brasil Sul, 7575
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Vila Esperança - Anápolis - GO
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Fone: (62)3902-2822 - (62)3902-2823 - (62)3902-2825 - (62)3902-2699
            </Typography>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}

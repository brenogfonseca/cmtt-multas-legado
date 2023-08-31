import { Box, Button, Card, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function ImportCdn({ formSubmitted, stateCdn, stateDb, tipo }) {
  console.log("Tipo do Importcdn: " + tipo)
  if (!formSubmitted || stateDb.status !== "success") return null;
  const { responseDiario, responseInterno } = stateCdn;
  return (
    <Grid component={Card} style={{ padding: "2em" }} item xs={3}>
      {stateCdn.status === "loading" ? (
        <Box>
          <Typography>Enviando Dados</Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" style={{ marginBottom: "1em" }}>
            Gerador de PDF
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              {responseDiario.status === "error" ? (
                <Typography>PDF Diário: {responseDiario.message}</Typography>
              ) : (
                <Button
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                  fullWidth
                  variant="contained"
                  //href={`https://api.anapolis.go.gov.br/apiupload/cmtt/autuacao/${response.responseDiario.pathFile}`}
                  href={`https://api.anapolis.go.gov.br/apiupload/cmtt/${tipo === 'AUTUACAO' ? 'autuacao' : 'penalidade'}/${stateCdn.responseDiario.pathFile}`}
                  target="_blank"
                >
                  PDF Diário
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              {responseInterno.status === "error" ? (
                <Typography>PDF Interno: {responseDiario.message}</Typography>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  //href={`https://api.anapolis.go.gov.br/apiupload/cmtt/penalidade/${stateCdn.responseInterno.pathFile}`}
                  href={`https://api.anapolis.go.gov.br/apiupload/cmtt/${tipo === 'AUTUACAO' ? 'autuacao' : 'penalidade'}/${response.responseInterno.pathFile}`}
                  target="_blank"
                >
                  PDF Interno
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </Grid>
  );
}

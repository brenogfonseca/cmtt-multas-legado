import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function ImportCdn({ loading, formSubmitted, response }) {
  if (!formSubmitted) return null;
  console.log(response);
  return (
    <Grid item>
      {loading ? (
        <Box>
          <Typography>Enviando Dados</Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" style={{ marginTop: "1em" }}>
            Arquivo Gerado Com Sucesso
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Button
                style={{ marginTop: "1em", marginBottom: "1em" }}
                fullWidth
                variant="contained"
                href={`https://api.anapolis.go.gov.br/apiupload/cmtt/penalidade/${response.responseDiario.pathFile}`}
                target="_blank"
              >
                PDF Diário
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                href={`https://api.anapolis.go.gov.br/apiupload/cmtt/penalidade/${response.responseInterno.pathFile}`}
                target="_blank"
              >
                PDF Interno
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Grid>
  );
}

import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function ImportCdn({ loading, formSubmitted, response }) {
  if (!formSubmitted) return null;
  return (
    <Grid item>
      {loading ? (
        <Box>
          <Typography>Enviando Dados</Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5">Arquivo Gerado Com Sucesso</Typography>
          <Button
            href="https://api.anapolis.go.gov.br/apiupload/cmtt/penalidade/cmtt-PENALIDADE-1691671212283.pdf"
            target="_blank"
          >
            PDF Diário
          </Button>
          <Button
            href="https://api.anapolis.go.gov.br/apiupload/cmtt/penalidade/cmtt-PENALIDADE-1691671212283.pdf"
            target="_blank"
          >
            PDF Interno
          </Button>
        </Box>
      )}
    </Grid>
  );
}

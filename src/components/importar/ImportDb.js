import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function ImportDb({ loading, formSubmitted, response }) {
  if (!formSubmitted) return null;
  return (
    <Grid item>
      {loading ? (
        <Box>
          <Typography>Enviando Dados</Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" style={{ marginTop: "1em" }}>
            {response.message}
          </Typography>
          Linhas adicionadas no Banco: {response.linhasAlteradas}
        </Box>
      )}
    </Grid>
  );
}

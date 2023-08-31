import {
  Box,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";

export default function ImportDb({ formSubmitted, stateDb }) {
  if (!formSubmitted) return null;
  const { response, status } = stateDb;
  return (
    <Grid component={Card} style={{ padding: "2em" }} item xs={4}>
      <Typography variant="h5">Banco de Dados</Typography>
      {status === "loading" ? (
        <Box>
          <Typography variant="h5" style={{ marginTop: "1em" }}>
            Enviando Dados
          </Typography>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography style={{ marginTop: "1em" }}>
            {response.message}
          </Typography>
          {status === "success" ? (
            <Typography style={{ marginTop: "1em" }}>
              Linhas adicionadas no Banco: {response.linhasAlteradas}
            </Typography>
          ) : (
            <Typography style={{ marginTop: "1em" }}>Erro No Envio</Typography>
          )}
        </Box>
      )}
    </Grid>
  );
}

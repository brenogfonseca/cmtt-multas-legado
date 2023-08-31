import { Button, Card, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { PatternFormat } from "react-number-format";

export default function ImportUpload({ data, setData, json, formSubmitted }) {
  return (
    <Grid component={Card} style={{ padding: "2em" }} item xs={3}>
      <Typography variant="h5">Upload de Arquivos</Typography>
      <Typography style={{ marginTop: "1em" }}>
        Quantidade de Penalidades carregadas: {json.length}
      </Typography>
      <PatternFormat
        style={{ marginTop: "1em" }}
        value={data}
        onChange={(e) => setData(e.target.value)}
        customInput={TextField}
        format="##/##/####"
        disabled={formSubmitted}
        variant="outlined"
        label="Data de envio"
      />
      <br />
      <Button
        style={{ marginTop: "1em" }}
        color="primary"
        disabled={formSubmitted}
        variant="contained"
        type="submit"
      >
        Enviar dados
      </Button>
    </Grid>
  );
}

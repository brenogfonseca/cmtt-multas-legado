import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { api47, apiBusca } from "../../services/api";
import { postJsonApi, postRelatorioDb } from "../../actions";
import ImportDb from "./ImportDb";
import ImportCdn from "./ImportCdn";

export default function ImportStepper({ json }) {

  const [data, setData] = useState("");


  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCdn, setLoadingCdn] = useState(false);
  const [tipo, setTipo] = useState('')
  const [dadosRecebidos, setDadosRecebidos] = useState({
    responseDiario: {
      message: "",
      pathFile: "",
    },
    responseInterno: {
      message: "",
      pathFile: "",
    },
  });


  const [dadosRecebidosDb, setDadosRecebidosDb] = useState({
    message: "",
    linhasAlteradas: "",
  });



  const getTipoNome = (linha) => {
    switch (linha.tipo_notif) {
      case "1":
        return "AUTUACAO";
      case "2":
        return "PENALIDADE";
      default:
        return "ERRO";
    }
  };

  useEffect(() => {
    const dataAtual = new Date().toJSON().slice(0, 10);
    const dataConvertida = moment(dataAtual).format("DD/MM/YYYY");
    setData(dataConvertida);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataFormulario = moment(data, "DD/MM/YYYY");
    const dataAtual = new Date();

    if (dataAtual < dataFormulario) {
      alert("data maior");
      return
    }
    setFormSubmitted(true);
    setLoading(true);
    setLoadingCdn(true);
    const tipoNome = getTipoNome(json[0]);


    const dataToSendDb = {
      linhas: json,
      data,
    };

    const dataToSendCdn = {
      json,
      tipoNome,
    };


    const responseDb = await postRelatorioDb(dataToSendDb).then((response) => {
      setLoading(false);
      return response;
    });
    setDadosRecebidosDb(responseDb);

    const responseCdn = await postJsonApi(dataToSendCdn).then((response) => {
      setLoadingCdn(false);
      setTipo(tipoNome)
      return response;
    });
    setDadosRecebidos(responseCdn);


  };

  return (
    <Card component={"form"} onSubmit={handleSubmit}>
      <Grid container justifyContent="space-around">
        <Grid item>
          <Typography variant="h5" style={{ marginTop: "1em" }}>
            Arquivo Carregado Com Sucesso
          </Typography>
          <Typography style={{ marginTop: "1em" }}>
            Quantidade de Penalidades carregadas: {json.length}
          </Typography>
          <PatternFormat
            style={{ marginTop: "1em" }}
            value={data}
            onChange={(e) => setData(e.target.value)}
            customInput={TextField}
            format="##/##/####"
            variant="outlined"
            label="Data de envio"
          />
          <br />
          <Button
            style={{ marginTop: "1em" }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Enviar dados
          </Button>
        </Grid>
        <ImportDb
          loading={loading}
          formSubmitted={formSubmitted}
          response={dadosRecebidosDb}
        />
        <ImportCdn
          loading={loadingCdn}
          formSubmitted={formSubmitted}
          response={dadosRecebidos}
          tipo={tipo}

        />
      </Grid>
    </Card>
  );
}

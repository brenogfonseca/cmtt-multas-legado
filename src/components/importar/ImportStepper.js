import { Box, Grid } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { postJsonApi, postRelatorioDb } from "../../actions";
import ImportDb from "./ImportDb";
import ImportCdn from "./ImportCdn";
import ImportUpload from "./ImportUpload";

export default function ImportStepper({ json }) {
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [stateCdn, setStateCdn] = useState({
    responseDiario: {
      message: "",
      pathFile: "",
    },
    responseInterno: {
      message: "",
      pathFile: "",
    },
    status: "idle",
  });
  const [stateDb, setStateDb] = useState({
    response: {
      message: "",
      linhasAlteradas: "",
    },
    status: "idle",
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
      //mudar texto para forma mais bonita usando toast
      alert("data maior");
      return;
    }
    setFormSubmitted(true);

    const tipoNome = getTipoNome(json[0]);

    const dataToSendDb = {
      linhas: json,
      data,
    };

    const dataToSendCdn = {
      json,
      tipoNome,
    };

    postRelatorioDb(dataToSendDb, setStateDb).then(() => {
      postJsonApi(dataToSendCdn, setStateCdn).then((res) => {
        setTipo(tipoNome);
      });
    });
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <Grid container justifyContent="space-around">
        <ImportUpload
          data={data}
          setData={setData}
          json={json}
          formSubmitted={formSubmitted}
        />
        <ImportDb formSubmitted={formSubmitted} stateDb={stateDb} />
        <ImportCdn
          formSubmitted={formSubmitted}
          stateCdn={stateCdn}
          stateDb={stateDb}
          tipo={tipo}
        />
      </Grid>
    </Box>
  );
}

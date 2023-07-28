import { Button, Card, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";

export default function ImportPenalidades() {
  const [linhas, setLinhas] = useState([]);
  const [data, setData] = useState("");

  const convertDate = (date) => {
    if (date == "" || date == undefined || date == null) {
      return null;
    }
    var dt_postagem_ano = date.substr(0, 4);
    var dt_postagem_mes = date.substr(4, 2);
    var dt_postagem_dia = date.substr(6, 2);

    return dt_postagem_dia + "/" + dt_postagem_mes + "/" + dt_postagem_ano;
  };

  useEffect(() => {
    const dataAtual = new Date().toJSON().slice(0, 10);
    const dataConvertida = moment(dataAtual).format("DD/MM/YYYY");
    setData(dataConvertida);
  }, []);

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const textLinhas = text.split("\n");
      textLinhas.pop();
      textLinhas.pop();
      textLinhas.shift();
      const textArray = textLinhas.map((textLinha, i) => {
        textLinha = textLinha.replace(/\s+/g, "");

        const tipo = textLinha.slice(0, 2);
        const sequencial = textLinha.slice(2, 8);
        const placa = textLinha.slice(8, 15);
        const auto = textLinha.slice(15, 25);
        const tipo_notif = textLinha.slice(25, 26);
        const motivo = textLinha.slice(26, 28);
        const postagem = textLinha.slice(28, 36);
        const cod_infracao = textLinha.slice(36, 41);
        const autuador = textLinha.slice(41, 47);
        const chave = textLinha.slice(47, 57);
        let dt_infracao = textLinha.slice(-8);
        const venc_notif = textLinha.slice(57, 65);

        const dt_postagem = convertDate(postagem);
        dt_infracao = convertDate(dt_infracao);
        const dt_venc_notif = convertDate(venc_notif);
        return {
          tipo,
          sequencial,
          placa,
          auto,
          tipo_notif,
          motivo,
          dt_postagem,
          cod_infracao,
          autuador,
          chave,
          dt_venc_notif,
          dt_infracao,
        };
      });
      setLinhas(textArray);
    };
    reader.readAsText(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataFormulario = moment(data, "DD/MM/YYYY");
    const dataAtual = new Date();

    if (dataAtual < dataFormulario) {
      alert("data maior");
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", token)

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: linhas,
      redirect: "follow",
    };
    await axios.post("http://192.168.1.112:4700/upload/json", {
      json: linhas,
    });
  };

  return (
    <div align={"center"}>
      <Typography align={"center"} variant={"h4"}>
        Importar Penalidades
      </Typography>

      {linhas.length ? (
        <Card component={"form"} onSubmit={handleSubmit}>
          <Typography variant="h5" style={{ marginTop: "1em" }}>
            Arquivo Carregado Com Sucesso
          </Typography>
          <Typography style={{ marginTop: "1em" }}>
            Quantidade de Penalidades carregadas: {linhas.length}
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
        </Card>
      ) : (
        <label style={{ marginTop: "2rem" }} htmlFor="upload-photo">
          <input
            onChange={(e) => showFile(e)}
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
          />

          <Button
            style={{ marginTop: "2rem" }}
            color="secondary"
            variant="contained"
            component="span"
          >
            Upload de Arquivo
          </Button>
        </label>
      )}
    </div>
  );
}

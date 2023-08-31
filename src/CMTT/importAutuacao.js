import { Button, Typography } from "@material-ui/core";
import ImportStepper from "../components/importar/ImportStepper";
import { useState } from "react";

export const ImportAutuacao = () => {
  const [json, setJson] = useState([]);
  console.log(json)

  const convertDate = (date) => {
    if (date == "" || date == undefined || date == null) {
      return null;
    }
    var dt_postagem_ano = date.substr(0, 4);
    var dt_postagem_mes = date.substr(4, 2);
    var dt_postagem_dia = date.substr(6, 2);

    return dt_postagem_dia + "/" + dt_postagem_mes + "/" + dt_postagem_ano;
  };

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
        //const valor_infracao = textLinha.slice(65, 77);
        const dt_postagem = convertDate(postagem);
        const dt_venc_notif = convertDate(venc_notif);
        dt_infracao = convertDate(dt_infracao);
        const formatter = new Intl.NumberFormat("br", {
          style: "currency",
          currency: "BRL",
        });
        // const valor_inf = valor_infracao / 100;
        // const money = formatter.format(valor_inf);
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
          //money,
          dt_infracao,
        };
      });
      setJson(textArray);
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div align={"center"}>
      <Typography align={"center"} variant={"h4"}>
        Importar Autuações
      </Typography>

      {json.length ? (
        <ImportStepper json={json} />
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
  )
}

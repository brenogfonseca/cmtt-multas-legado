jQuery(document).ready(function ($) {
  $("#btn-overlay-close").click(function () {
    $("#search-full-overlay").removeClass("active");
    $("body").css({ overflow: "", "padding-right": "" });
  });

  $("#menu").mmenu({
    extensions: ["pagedim-black"],
    navbars: [
      {
        position: "top",
        content: ["searchfield"]
      },
      {
        position: "bottom",
        content: [
          "<a class='fa fa-facebook-square' href='https://www.facebook.com/Secretaria-Municipal-de-Desenvolvimento-Social-de-An%C3%A1polis-119153552805998/'></a>",
          "<a class='fa fa-instagram' href='https://instagram.com/prefanapolis.social?igshid=13nnb85yk45yd'></a>",
          "<a class='fa fa-vimeo' href='https://vimeo.com/365557647'></a>"
        ]
      }
    ]
  });

  $("#owl-slider").owlCarousel({
    items: 1,
    loop: true
  });

  $("#owl-testimonials").owlCarousel({
    items: 1,
    loop: true
  });
});

//Função Bloqueia Quadra e Lote
// $(document).ready(function () {
//   document.getElementById("quadra").onkeypress = function (e) {
//     var chr = String.fromCharCode(e.which);
//     if ("1234567890abcdefghijuoUABCDEFGHIJO/".indexOf(chr) < 0)
//       return false;
//   }
//   document.getElementById("lote").onkeypress = function (e) {
//     var chr = String.fromCharCode(e.which);
//     if ("1234567890abcdefghiujuoUABCDEFGHIJO/".indexOf(chr) < 0)
//       return false;
//   }
// });
//maskaras Frontend
$(document).ready(function () {
  $("#cep").mask("00000-000")
  $("#cpf").mask("000.000.000-00");
  $("#cpfAccess").mask("000.000.000-00");
  $("#cpfAbrigo").mask("000.000.000-00");
  $("#telefone").mask("(00) 9 0000-0000");
  $("#dt_nasc_contato").mask("00/00/0000");
  $("#contatoEmergencia").mask("(00) 0 0000-0000");
});
//Validações em FrontEnd
$(document).ready(function () {
  $("#confEmail").blur(function () {
    var email = $("#email1").val();
    var cEmail = $("#confEmail").val();
    if (email != cEmail) {
      $("#email1Div").addClass("noValid")
      $("#confEmailDiv").addClass("noValid")
      $("#email1Div").removeClass("valid")
      $("#confEmailDiv").removeClass("valid")
      $("#emails").css({ "display": "table" });
      $("#emails").html("E-mails não são Iguais");
      $("#atualizarDadosConta").attr("disabled", true);
      $("#atualizarDadosConta").addClass("btn-danger")

    } else {
      $("#email1Div").removeClass("noValid")
      $("#confEmailDiv").removeClass("noValid")
      $("#email1Div").addClass("valid")
      $("#confEmailDiv").addClass("valid")
      $("#emails").css({ "display": "none" });
      $("#atualizarDadosConta").removeAttr("disabled");
      $("#atualizarDadosConta").addClass("btn-primary")
      $("#atualizarDadosConta").removeClass("btn-danger")
    }
  });
});

$(document).ready(function () {
  $("#confSenha").blur(function () {
    var email = $("#senha").val();
    var cEmail = $("#confSenha").val();
    if (email != cEmail) {
      $("#senhaDiv").addClass("noValid")
      $("#confSenhaDiv").addClass("noValid")
      $("#senhaDiv").removeClass("valid")
      $("#confSenhaDiv").removeClass("valid")
      $("#senhas").addClass(" alert-danger");
      $("#senhas").html("Senhas não são Iguais");
      $("#alteraSenha").attr("disabled", true);
      $("#alteraSenha").addClass("btn-danger")
    } else {
      $("#senhaDiv").removeClass("noValid")
      $("#confSenhaDiv").removeClass("noValid")
      $("#senhaDiv").addClass("valid")
      $("#confSenhaDiv").addClass("valid")
      $("#senhas").addClass(" alert-success");
      $("#senhas").html("Senhas são Iguais");
      $("#alteraSenha").removeAttr("disabled");
      $("#alteraSenha").addClass("btn-primary")
      $("#alteraSenha").removeClass("btn-danger")
    }
  });
});

function CPF() {
  "user_strict";
  function r(r) {
    for (var t = null, n = 0; 9 > n; ++n)
      t += r.toString().charAt(n) * (10 - n);
    var i = t % 11;
    return i = 2 > i ? 0 : 11 - i
  }
  function t(r) {
    for (var t = null, n = 0; 10 > n; ++n)
      t += r.toString().charAt(n) * (11 - n);
    var i = t % 11;
    return i = 2 > i ? 0 : 11 - i
  }
  var n = "CPF Inválido", i = "CPF Válido";
  this.gera = function () {
    for (var n = "", i = 0; 9 > i; ++i)
      n += Math.floor(9 * Math.random()) + "";
    var o = r(n), a = n + "-" + o + t(n + "" + o);
    return a
  }, this.valida = function (o) {
    for (var a = o.replace(/\D/g, ""), u = a.substring(0, 9), f = a
      .substring(9, 11), v = 0; 10 > v; v++)
      if ("" + u + f == "" + v + v + v + v + v + v + v + v + v + v + v)
        return n;
    var c = r(u), e = t(u + "" + c);
    return f.toString() === c.toString() + e.toString() ? i : n
  }
}

var CPF = new CPF();

$(document).ready(function () {
  $("#cpf").keyup(function () {
    var teste = CPF.valida($(this).val());
    $("#resposta").html(teste);
    if (teste == "CPF Válido") {
      $("#Acessar").removeAttr("disabled");
      $("#Acessar").addClass(" btn-acessar");
      $("#resposta").removeClass("alert-danger");
      $("#resposta").addClass(" alert-success");
    } else {
      $("#Acessar").attr("disabled", true);
      $("#Acessar").addClass("btn-danger");
      $("#resposta").addClass(" alert-danger");
      $("#resposta").removeClass("alert-success");
    }
  });

  $("#cpfAccess").keyup(function () {
    var teste = CPF.valida($(this).val());
    $("#resposta").html(teste);
    if (teste == "CPF Válido") {
      $("#Acessar").removeAttr("disabled");
      $("#Acessar").addClass(" btn-acessar");
      $("#resposta").removeClass("alert-danger");
      $("#resposta").addClass(" alert-success");
    } else {
      $("#Acessar").attr("disabled", true);
      $("#Acessar").addClass("btn-danger");
      $("#resposta").addClass(" alert-danger");
    }
  });

});

// Script Para Busca do CEP
$(document).ready(function () {
  function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    $("#rua").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#uf").val("");
    $("#ibge").val("");
  }

  //Quando o campo cep perde o foco.
  $("#cep").blur(function () {
    //Nova variável "cep" somente com dígitos.
    var cep = $(this)
      .val()
      .replace(/\D/g, "");

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        $("#rua").val("...");
        $("#bairro").val("...");
        $("#cidade").val("...");
        $("#uf").val("...");



        //Consulta o webservice viacep.com.br/
        $.getJSON(
          "https://viacep.com.br/ws/" + cep + "/json/?callback=?",
          function (dados) {
            if (!("erro" in dados)) {
              //Atualiza os campos com os valores da consulta.
              if (dados.bairro == "") {
                $("#bairro").val("SEM BAIRRO");
              } else {
                $("#bairro").val(dados.bairro);
              }
              if (dados.logradouro == "") {
                $("#rua").val("");
                $("#rua").prop("readonly", false);
                $("#rua").focus();
              } else {
                $("#rua").val(dados.logradouro);
                $("#rua").prop("readonly", true);
                $("#numero").focus();
              }
              $("#cidade").val(dados.localidade);
              $("#uf").val(dados.uf);
              $("#bairro").prop("readonly", true);
              $("#cidade").prop("readonly", true);
              $("#uf").prop("readonly", true);
            } //end if.
            else {
              if (cep === '75000000') {
                $("#rua").val("");
                $("#bairro").val("");
                $("#cidade").val("Anápolis");
                $("#uf").val("GO");
                $("#cidade").prop("readonly", true);
                $("#uf").prop("readonly", true);
              }
              else {
                //CEP pesquisado não foi encontrado.
                limpa_formulário_cep();
                alert("CEP não encontrado." + cep);
                $("#cep").val("");
              }
            }
          }
        );
      } //end if.
      else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
        $("#cep").val("");
      }
    } //end if.
    else {
      //cep sem valor, limpa formulário.
      limpa_formulário_cep();
    }
  });
});

//Função para voltar ao inicio em campos com mascara

$.fn.selectRange = function (start, end) {
  if (typeof end === "undefined") {
    end = start;
  }
  return this.each(function () {
    if ("selectionStart" in this) {
      this.selectionStart = start;
      this.selectionEnd = end;
    } else if (this.setSelectionRange) {
      this.setSelectionRange(start, end);
    } else if (this.createTextRange) {
      var range = this.createTextRange();
      range.collapse(true);
      range.moveEnd("character", end);
      range.moveStart("character", start);
      range.select();
    }
  });
};

//
//	var toggle = false;
//
//	setInterval(function () {
//
//
//	    toggle = !toggle;
//	}, 2000);
function inicializar(x, y) {
  var coordenadas = { lat: x, lng: y };

  var mapa = new google.maps.Map(document.getElementById("mapa"), {
    zoom: 15,
    center: coordenadas
  });

  var marker = new google.maps.Marker({
    position: coordenadas,
    map: mapa,
    title: "LOCAL"
  });
}

function geo(a) {
  var endereco = a;
  $.ajax({
    url: endereco,
    complete: function (res) {
      var data = JSON.parse(res.responseText);
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      inicializar(lat, lng);
    }
  });
}


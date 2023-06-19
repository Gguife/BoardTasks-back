const S = require('string')

function tratarErros (res, err){
  //Quando ocorrer algume erro no mongoose (Erro aparece para o usuário)
  if(String(err).includes(`ValidationError:`)){
    return res.status(400).json({
      status: "Erro",
      statusMensagem: S(String(err).replace("ValidationError: ", "")).replaceAll(';', '').s,
      resposta: String(err)
    });
  }

  //Erro definido manualmente por mim
  if(String(err).includes(`Error:`)){
    return res.status(400).json({
      status: 'Erro',
      statusMensagem: String(err).replace("Error: ", ""),
      resposta: String(err)
    });
  }

  //Erro inesperado
  console.error(err);
  return res.status(500).josn({
    status: "Erro",
    statusMensagem: "Houve um problema inesperado, tente novamente mais tarde.",
    resposta: String(err)
  });
}

module.exports = tratarErros;
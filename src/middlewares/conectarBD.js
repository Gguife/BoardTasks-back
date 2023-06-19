const mongoose = require('mongoose');
const tratarErros = require('../functions/tratarErros')

async function conectarBancoDados( req = null, res = null, next= nul ){
  try{
    await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopoLogy: true});
    console.log('Conectando ao banco de dados!');
    try{ next() } catch{ };
    return mongoose;
  } catch (error){
    console.log(error)
    tratarErros(res, 'Error: Erro ao conectar no Banco de Dados')
    return error;
  }
}

module.exports = conectarBancoDados;
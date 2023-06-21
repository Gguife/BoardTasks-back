const express = require('express');
const bcrypt = require('bcrypt')
const conectarBancoDados = require('../middlewares/conectarBD');
const tratarErros = require('../functions/tratarErros');
const EsquemaUsuario = require('../models/usuario')
const router = express.Router();

/* GET users listing. */
router.post('/criar', conectarBancoDados, async function(req, res) {
  try{
    // #swagger.tags = ['Usuario']
    let {nome, email, senha} = req.body;
    const numeroVezesHash = 10;
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash);
    const respostaBD = await EsquemaUsuario.create({nome, email, senha: senhaHash});
    
    res.status(200).json({
      status: "OK",
      statusMensagem: "Usuario criado com sucesso",
      resposta: respostaBD
    })
  }catch (error){
    if(String(error).includes("email_1 dup key")){
      return tratarErros(res, "Erro: Já existe uma conta com esse e-mail")
    }
    return tratarErros(res, error);
  }
});

module.exports = router;

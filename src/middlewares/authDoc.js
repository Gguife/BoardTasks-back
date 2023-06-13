async function authDocProduction (req, res, next){
  const { senhaDigitada } = req.body; //Corpo da requisicao
  
  //Quando o usuario estevier no lacalhost
  if(req.headers.host.includes('localhost') || req.orignalUrl !== "/doc/"){
    return next();
  }

  //Quando o usuario digitar a senha correta
  if(senhaDigitada === process.env.SWAGGER_SENHA_DOC){
    return next()
  }

  //Quando o usuario digitar a senha incorreta
  if(senhaDigitada){
    res.status(401).set('Content-Type', 'text/html')
    res.send(Buffer.from(`
      <form method="post">
        <p style="color: red;">Senha Incorreta</p>
        <label for="senhaDigitada">Senha da Documentação:</label>
        <input type="password" name="senhaDigitada" id="senhaDigitada" />
        <button type="submit">Entrar</button>
      </form>
    `))
  }else{
    //Usuario ainda nao digitou a senha e esta em modo producao
    res.status(200).set('Content-Type', 'text/html')
    res.send(Buffer.from(`
      <form method="post">
        <label for="senhaDigitada">Senha da Documentação:</label>
        <input type="password" name="senhaDigitada" id="senhaDigitada" />
        <button type="submit">Entrar</button>
      </form>
    `))
  }
}

module.exports = authDocProduction;
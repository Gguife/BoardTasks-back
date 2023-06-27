const jwt = require("jsonwebtoken");
const tratarErros = require("../functions/tratarErros");

async function authUser(req, res, next){
  const token = req.headers['x-auth-token'];

  if(!token){
    return tratarErros(res, new Error("Token de auteticação não fornecido"));
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.usuarioJwt = decoded;

    next();
  }catch(error){
    console.log(error);
    return tratarErros(res, new Error("Token de autenticação inválido"))
  }
}

module.exports = authUser;
import "dotenv/config.js"
import jwt from "jsonwebtoken";

function gerarJwt(payload) {
  const tokenJwt = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h"
  })

  return tokenJwt;
}

export default gerarJwt;
import { randomBytes, scryptSync } from "crypto";

function criaHashESalSenha(password) {
  const salPassword = randomBytes(16).toString("hex");
  const hashPassword = scryptSync(password, salPassword, 64).toString("hex");

  return { hashPassword, salPassword };
}

export default criaHashESalSenha; 
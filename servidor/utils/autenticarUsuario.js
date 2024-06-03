import { scryptSync, timingSafeEqual } from "crypto";

function autenticarUsuario(password, user) {
  const hashTest = scryptSync(password, user.salPassword, 64);
  const hashReal = Buffer.from(user.hashPassword, "hex");
  const authenticated = timingSafeEqual(hashTest, hashReal);

  return authenticated;
}

export default autenticarUsuario;
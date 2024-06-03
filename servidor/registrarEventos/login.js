import { findUser } from "../db/usuariosDb.js";
import authenticateUser from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {
  socket.on("authenticate_sign_in", async ({ user, password }) => {
    const userData = await findUser(user);

    if(userData) {
      const tokenJwt = gerarJwt({ user }); 
      console.log(tokenJwt);
      const authenticated = authenticateUser(password, userData);

      if(authenticated) {
        socket.emit("authentication_success", tokenJwt);
      } else {
        socket.emit("authentication_failure");
      }
    } else {
      socket.emit("user_not_found");
    }
  })
}

export default registrarEventosLogin;
import { createUser, findUser } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io) {
  socket.on("sign_up", async (data) => {
    const user = await findUser(data.user);

    if(user === null) {
      const result = await createUser(data);

      if(result.acknowledged) {
        socket.emit("sign_up_success");
      } else {
        socket.emit("sign_up_failure");
      }
    } else {
      socket.emit("user_exists");
    }
    
  })
}

export default registrarEventosCadastro;
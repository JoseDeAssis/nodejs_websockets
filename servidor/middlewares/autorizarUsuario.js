import jwt from "jsonwebtoken";

function autorizarUsuario(socket, next) {
  const tokenJwt = socket.handshake.auth.token;
  try {
    const payloadToken = jwt.verify(tokenJwt, process.env.JWT_SECRET);

    socket.emit("authorization_success", payloadToken);

    next();
  } catch(error) {
    next(error);
  }
}

export default autorizarUsuario;
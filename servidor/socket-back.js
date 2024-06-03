import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosDisconectar from "./registrarEventos/disconnect.js";
import registrarEventosDocumento from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosLogin from "./registrarEventos/login.js";
import io from "./server.js";

io.on("connection", (socket) => {

  registrarEventosCadastro(socket, io);
  registrarEventosLogin(socket, io);
  registrarEventosInicio(socket, io);
  registrarEventosDocumento(socket, io);
  registrarEventosDisconectar(socket);
})


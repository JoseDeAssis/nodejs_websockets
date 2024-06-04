import "dotenv/config"
import autorizarUsuario from "./middlewares/autorizarUsuario.js";
import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosDesconectar from "./registrarEventos/disconnect.js";
import registrarEventosDocumento from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosLogin from "./registrarEventos/login.js";
import io from "./server.js";

const nspUsers = io.of("/users");

nspUsers.use(autorizarUsuario);

nspUsers.on("connection", (socket) => {
  registrarEventosInicio(socket, nspUsers);
  registrarEventosDocumento(socket, nspUsers);
  registrarEventosDesconectar(socket);
})

io.of("/").on("connection", (socket) => {

  registrarEventosCadastro(socket, io);
  registrarEventosLogin(socket, io);
})


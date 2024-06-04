import { definirCookie } from "../utils/cookies.js";

const socket = io();

function emitSignIn(data) {
  socket.emit("authenticate_sign_in", data);
}

socket.on("authentication_success", (tokenJwt) => {
  definirCookie("tokenJwt", tokenJwt);
  window.location.href = "/";
  alert("Usuário autenticado com sucesso!")
});
socket.on("authentication_failure", () => alert("Erro na autenticação"));
socket.on("user_not_found", () => alert("Usuário não encontrado"));

export { emitSignIn };
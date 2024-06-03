const socket = io();

function emitSignUp(data) {
  socket.emit("sign_up", data);
} 

socket.on("sign_up_success", () => alert("Cadastro realizado com sucesso!"));
socket.on("sign_up_failure", () => alert("Erro no cadastro"));
socket.on("user_exists", () => alert("Usuário já existe"));

export { emitSignUp };
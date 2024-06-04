import { alertAndRedirect, updateTextEditor } from "./documento.js";
import { obterCookie } from "../utils/cookies.js";

const socket = io("/users", {
  auth: {
    token: obterCookie("tokenJwt"),
  },
});

socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login/index.html";
})

function selectDocument(nome) {
  socket.emit("selecionar_documento", nome, (text) => {
    updateTextEditor(text);
  });
}

function textEditorEmitter(data) {
  socket.emit("texto_editor", data);
}

function deleteDocument(name) {
  socket.emit("excluir_documento", name);
}

socket.on("texto_editor_clientes", (texto) => {
  updateTextEditor(texto);
})

socket.on("disconnect", (motivo) => {
  console.log(`Servidor desconectado!
  Motivo: ${motivo}`);
});

socket.on("documento_excluido", (name) => {
  alertAndRedirect(name);
});

export { textEditorEmitter, selectDocument, deleteDocument };
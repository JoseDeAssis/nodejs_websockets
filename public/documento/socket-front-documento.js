import { alertAndRedirect, tratarAutorizacaoSucesso, updateTextEditor, updateUsersInterface } from "./documento.js";
import { obterCookie } from "../utils/cookies.js";

const socket = io("/users", {
  auth: {
    token: obterCookie("tokenJwt"),
  },
});

socket.on("authorization_success", tratarAutorizacaoSucesso);

socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login/index.html";
})

function selectDocument(entryData) {
  socket.emit("selecionar_documento", entryData, (text) => {
    updateTextEditor(text);
  });
}

socket.on("user_already_online", () => {
  alert("Documento já aberto em outra página");
  window.location.href = "/";
});

socket.on("users_in_document", updateUsersInterface);

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
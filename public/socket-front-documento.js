import { updateTextEditor } from "./documento.js";

const socket = io();

function selectDocument(nome) {
  socket.emit("selecionar_documento", nome, (text) => {
    updateTextEditor(text);
  });
}

function textEditorEmitter(data) {
  socket.emit("texto_editor", data);
}

socket.on("texto_editor_clientes", (texto) => {
  updateTextEditor(texto);
})

socket.on("disconnect", (motivo) => {
  console.log(`Servidor desconectado!
  Motivo: ${motivo}`);
});

export { textEditorEmitter, selectDocument };
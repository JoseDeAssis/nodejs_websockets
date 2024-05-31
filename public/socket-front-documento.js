import { updateTextEditor } from "./documento.js";

const socket = io();

function textEditorEmitter(text) {
  socket.emit("texto_editor", text);
}

socket.on("texto_editor_clientes", (texto) => {
  updateTextEditor(texto);
})

socket.on("disconnect", (motivo) => {
  console.log(`Servidor desconectado!
  Motivo: ${motivo}`);
});

export {textEditorEmitter};
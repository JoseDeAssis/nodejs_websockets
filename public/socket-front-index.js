import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";

const socket = io();

socket.emit("obter_documentos", async (documents) => {
  documents.forEach(document => {
    inserirLinkDocumento(document.name);
  });
});

socket.on("adicionar_documento_interface", (name) => {
  inserirLinkDocumento(name);
})

socket.on("documento_existente", (name) => {
  alert(`O documento ${name} já existe!`);
})

socket.on("documento_excluido", (name) => {
  removerLinkDocumento(name);
})

function emitAddDocument(name) {
  socket.emit("adicionar_documento", name);
}

export { emitAddDocument }
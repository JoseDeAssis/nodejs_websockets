import { deleteDocument, findDocument, updateDocument } from '../db/documentosDb.js';

function registrarEventosDocumento(socket, io) {
  socket.on("selecionar_documento", async (documentName, callback) => {
    socket.join(documentName);

    const document = await findDocument(documentName);
    if(document) {
      callback(document.text);
    }
  });

  socket.on("excluir_documento", async (name) => {
    const result = await deleteDocument(name);

    if(result.deletedCount) {
      io.emit("documento_excluido", name);
    } 
  })

  socket.on("texto_editor", async ({text, documentName}) => {
    const update = await updateDocument(documentName, text);

    if(update.modifiedCount) {
      socket.to(documentName).emit("texto_editor_clientes", text);
    }
  });
}

export default registrarEventosDocumento;
import io from "./server.js";
import { createDocument, deleteDocument, findDocument, getDocuments, updateDocument } from './documentosDb.js';

io.on("connection", (socket) => {
  socket.on("obter_documentos", async (returnDocuments) => {
    const documents = await getDocuments();
    returnDocuments(documents);
  });

  socket.on("adicionar_documento", async (name) => {
    const documentExists = (await findDocument(name)) !== null;

    if(documentExists) {
      socket.emit("documento_existente", name);
    } else {
      const result = await createDocument(name);

      if(result.acknowledged) {
        io.emit("adicionar_documento_interface", name);
      } 
    }    
  });

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

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
})


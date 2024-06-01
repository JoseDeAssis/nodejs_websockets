import io from "./server.js";
import { findDocument, updateDocument } from './documentosDb.js';

io.on("connection", (socket) => {
  console.log(`Um cliente se conectou ${socket.id}`);

  socket.on("selecionar_documento", async (documentName, callback) => {
    socket.join(documentName);

    const document = await findDocument(documentName);
    if(document) {
      callback(document.text);
    }
  })

  socket.on("texto_editor", async ({text, documentName}) => {
    const update = await updateDocument(documentName, text);

    if(update.modifiedCount) {
      socket.to(documentName).emit("texto_editor_clientes", text);
    }

  })

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
})


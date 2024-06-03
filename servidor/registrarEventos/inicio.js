import { createDocument, findDocument, getDocuments } from '../db/documentosDb.js';

function registrarEventosInicio(socket, io) {
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

}

export default registrarEventosInicio;
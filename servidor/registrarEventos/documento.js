import { deleteDocument, findDocument, updateDocument } from '../db/documentosDb.js';
import { addConnection, findConnection, getDocumentUsers, removeConnection } from '../utils/conexoesDocumentos.js';

function registrarEventosDocumento(socket, io) {
  socket.on("selecionar_documento", async ({ documentName, userName }, callback) => {
    const document = await findDocument(documentName);

    if(document) {
      const connectionFound = findConnection(documentName, userName);

      if(!connectionFound) {
        socket.join(documentName);
      
        addConnection({ documentName, userName });
        socket.data = {
          userOnline: true,
        };

        const documentUsers = getDocumentUsers(documentName);
  
        io.to(documentName).emit("users_in_document", documentUsers);
  
        callback(document.text);
      } else {
        socket.emit("user_already_online");
      }
    }

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

    socket.on("disconnect", () => {
      if(socket.data.userOnline) {
        removeConnection(documentName, userName);
  
        const documentUsers = getDocumentUsers(documentName);
        io.to(documentName).emit("users_in_document", documentUsers);
      }
    });
  });
}

export default registrarEventosDocumento;
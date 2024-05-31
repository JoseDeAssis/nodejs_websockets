import io from "./server.js";

const documents = [
  {
    name: "JavaScript",
    text: "Texto de javascript..."
  },
  {
    name: "Node",
    text: "Texto de node..."
  },
  {
    name: "Socket.io",
    text: "Texto de socket.io..."
  }
]

io.on("connection", (socket) => {
  console.log(`Um cliente se conectou ${socket.id}`);

  socket.on("selecionar_documento", (documentName, callback) => {
    socket.join(documentName);

    const document = findDocument(documentName);
    if(document) {
      callback(document.text);
    }
  })

  socket.on("texto_editor", ({text, documentName}) => {
    const document = findDocument(documentName);

    if(document) {
      document.text = text;
      socket.to(documentName).emit("texto_editor_clientes", text);
    }

  })

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
})

function findDocument(name) {
  const document = documents.find((doc) => doc.name === name);

  return document;
}

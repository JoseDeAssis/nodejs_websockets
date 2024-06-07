const documentsConnections = [];

function addConnection(connection) {
  documentsConnections.push(connection);
}

function getDocumentUsers(documentName) {
  return documentsConnections
    .filter((connection) => connection.documentName === documentName)
    .map((connection) => connection.userName);
}

function findConnection(documentName, userName) {
  return documentsConnections.find((connection) => connection.documentName === documentName 
    && connection.userName === userName);
}

function removeConnection(documentName, userName) {
  const index = documentsConnections.findIndex((connection) => connection.documentName === documentName 
                  && connection.userName === userName);
  
  if(index !== -1) {
    documentsConnections.splice(index, 1);
  }
}

export { addConnection, getDocumentUsers, removeConnection, findConnection };
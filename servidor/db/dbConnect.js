import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_CONNECTION_STRING);
let documentCollection;
let usersCollection;

try {
  await client.connect();

  const db = client.db(process.env.DB_NAME);
  documentCollection = db.collection(process.env.DB_COLLECTION_DOCUMENTS);
  usersCollection = db.collection(process.env.DB_COLLECTION_USERS);

  console.log("Conectado ao banco com sucesso!");
} catch(error) {
  console.log(error);
}

export { documentCollection, usersCollection };
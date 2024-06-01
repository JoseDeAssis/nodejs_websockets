import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_CONNECTION_STRING);
let documents;

try {
  await client.connect();

  const db = client.db(process.env.DB_NAME);
  documents = db.collection(process.env.DB_COLLECTION_NAME)

  console.log("Conectado ao banco com sucesso!");
} catch(error) {
  console.log(error);
}

export { documents };
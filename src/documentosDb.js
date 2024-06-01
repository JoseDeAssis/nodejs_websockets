import 'dotenv/config';
import { documentCollection } from "./dbConnect.js";

function getDocuments() {
  const documents = documentCollection.find().toArray();
  
  return documents;
}

function findDocument(name) {
  const document = documentCollection.findOne({ name: name });

  return document;
}

function createDocument(name) {
  const result = documentCollection.insertOne({
    name,
    text: ""
  });

  return result;
}

function updateDocument(name, text) {
  const update = documentCollection.updateOne({ name }, { $set: { text }});

  return update;
}

function deleteDocument(name) {
  const result = documentCollection.deleteOne({ name });

  return result;
}

export { findDocument, updateDocument, getDocuments, createDocument, deleteDocument };
import 'dotenv/config';
import { documents } from "./dbConnect.js";

function findDocument(name) {
  const document = documents.findOne({ name: name });

  return document;
}

function updateDocument(name, text) {
  const update = documents.updateOne({ name }, { $set: { text }});

  return update;
}

export { findDocument, updateDocument };
import { selectDocument, textEditorEmitter } from "./socket-front-documento.js";

const params = new URLSearchParams(window.location.search);
const documentName = params.get("nome");

const textEditor = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");
documentTitle.textContent = documentName || "Documento sem título";

selectDocument(documentName);

textEditor.addEventListener("keyup", () => {
  textEditorEmitter({
    text: textEditor.value,
    documentName
  });
})

function updateTextEditor(texto) {
  textEditor.value = texto;
}

export { updateTextEditor };
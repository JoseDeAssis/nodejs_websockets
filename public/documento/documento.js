import { deleteDocument, selectDocument, textEditorEmitter } from "./socket-front-documento.js";

const params = new URLSearchParams(window.location.search);
const documentName = params.get("nome");

const textEditor = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");
const deleteButton = document.getElementById("excluir-documento");
documentTitle.textContent = documentName || "Documento sem título";

selectDocument(documentName);

textEditor.addEventListener("keyup", () => {
  textEditorEmitter({
    text: textEditor.value,
    documentName
  });
})

deleteButton.addEventListener("click", () => {
  if(confirm("Deseja excluir o documento?") === true) {
    deleteDocument(documentName);
  } 
})

function updateTextEditor(texto) {
  textEditor.value = texto;
}

function alertAndRedirect(name) {
  if(name === documentName) {
    alert(`Documento ${name} excluído com sucesso!`);
    window.location.href = "/";
  }
}

export { updateTextEditor, alertAndRedirect };
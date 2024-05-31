import { textEditorEmitter } from "./socket-front-documento.js";

const textEditor = document.getElementById("editor-texto");

textEditor.addEventListener("keyup", () => {
  textEditorEmitter(textEditor.value);
})

function updateTextEditor(texto) {
  textEditor.value = texto;
}

export { updateTextEditor };
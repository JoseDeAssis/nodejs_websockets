import { emitAddDocument } from  "./socket-front-index.js";

const documentList = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocument = document.getElementById("input-documento");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  emitAddDocument(inputDocument.value);

  inputDocument.value = "";
})

function inserirLinkDocumento(documentName) {
  documentList.innerHTML += `
  <a
    href="./documento/documento.html?nome=${documentName}"
    class="list-group-item list-group-item-action"
    id="documento-${documentName}"
  >
    ${documentName}
  </a>`;
}

function removerLinkDocumento(documentName) {
  const element = document.getElementById(`documento-${documentName}`);

  documentList.removeChild(element);
}

export { inserirLinkDocumento, removerLinkDocumento };
// this code will be executed when the extension's button is clicked
(function () {
  console.log("execute.js executed");
  //document.getElementById("submit").addEventListener("click", submitToFirebase);

  const modal = document.getElementById("highlightDialog");
  if (modal && modal.style.display == "none") {
    openModal(modal);
  } else {
    closeModal(modal);
  }
})();

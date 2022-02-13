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

function openModal(modal) {
  console.log("open modal");
  modal.style.display = "block";

  // const iframe = document.getElementById("popup-content");
  // iframe.frameBorder = 0;
  // if (iframe.contentDocument) {
  //   doc = iframe.contentDocument;
  // } else {
  //   doc = iframe.contentWindow.document;
  // }

  // var requestOptions = {
  //   method: "GET",
  //   redirect: "follow",
  // };

  // fetch(
  //   "https://code.peikai.pii.at/iframe?text=" +
  //     window.getSelection().toString(),
  //   requestOptions
  // )
  //   .then((response) => {
  //     return response.text();
  //   })
  //   .then((result) => {
  //     doc.body.innerHTML = "<p>" + window.getSelection().toString() + "</p>";
  //     doc.body.innerHTML +=
  //       "<label class='switch'> <input type='checkbox' checked> <span class='slider round'></span></label>";
  //     doc.body.innerHTML += "<p>" + result + "</p>";
  //     doc.body.innerHTML += "<input type='text' id='fname' name='fname'>";
  //   })
  //   .catch((error) => console.log("error", error));
}

function closeModal(modal) {
  console.log("close modal");
  modal.style.display = "none";
}

// function submitToFirebase() {
//   // get value of truth selection
//   var truth = document.getElementById("GMTS_Form_Truth").value;
//   // get url
//   var url = document.getElementById("GMTS_Form_URL").value;
//   // validity check
//   if (!url.includes("ieee")) {
//     alert("Invalid source. Use only sources from ieee.");
//     return;
//   }
//   // TODO: Uncomment
//   checkExisting();
// }

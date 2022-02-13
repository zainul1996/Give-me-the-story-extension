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

  // load and populate table
  var index = 0;
  for (var string in DATA["keywords"]["arrayValue"]["values"]) {
    if (string.value == lastHighlightedText) {
      break;
    }
    index++;
  }

  var backings =
    DATA["keywords"]["arrayValue"]["values"][index]["mapValue"]["fields"];

  // iterate positive and add to table
  var posTable = document.getElementById("pos_table");
  for (var link in backings["positiveBackings"]["arrayValue"]["values"]) {
    posTable.innerHTML +=
      `
      <tr><td href=` +
      link.value +
      `>` +
      link.value +
      `</td></tr>
    `;
  }

  var negTable = document.getElementById("neg_table");
  for (var link in backings["negativeBackings"]["arrayValue"]["values"]) {
    negTable.innerHTML +=
      `
      <tr><td href=` +
      link.value +
      `>` +
      link.value +
      `</td></tr>
    `;
  }
}

function closeModal(modal) {
  console.log("close modal");
  modal.style.display = "none";

  // empty out table
  document.getElementById("pos_table").innerHTML = "";
  document.getElementById("neg_table").innerHTML = "";
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

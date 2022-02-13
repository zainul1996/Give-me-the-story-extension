// this code will be executed when the extension's button is clicked
(function () {
  console.log("execute.js executed");
  document.getElementById("submit").addEventListener("click", submitToFirebase);

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

function submitToFirebase() {
  //console.log(document.getElementById("backings").value);
  //insertBaseDocument("greetings",document.getElementById("backings").value,"https://code.peikai.pii.at/iframe?text=hello");
  checkExisting();
}

function insertBaseDocument(highlightedword, backings, currentLink) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    fields: {
      backings: {
        arrayValue: {
          values: [
            {
              mapValue: {
                fields: {
                  negativeBackings: {
                    arrayValue: {
                      values: [
                        {
                          stringValue: backings,
                        },
                      ],
                    },
                  },
                  positiveBackings: {
                    arrayValue: {
                      values: [
                        {
                          stringValue: "link",
                        },
                      ],
                    },
                  },
                },
              },
            },
          ],
        },
      },
      keywords: {
        arrayValue: {
          values: [
            {
              stringValue: highlightedword,
            },
          ],
        },
      },
      site_name: {
        stringValue: currentLink,
      },
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://firestore.googleapis.com/v1beta1/projects/givemethesource/databases/(default)/documents/Sites",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function checkExisting() {
  var checkStatus = false;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "https://firestore.googleapis.com/v1/projects/givemethesource/databases/(default)/documents/Sites",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const obj = JSON.parse(result);
      console.log(document.URL);
      console.log(obj.documents);
      for (x in obj.documents) {
        console.log(obj.documents[x].fields.site_name.stringValue);
        if (obj.documents[x].fields.site_name.stringValue == document.URL) {
          checkStatus = true;
          console.log("exist");
          return;
        }
      }
      console.log("dont_exist");
      insertBaseDocument(
        "highlighted text",
        document.getElementById("backings").value,
        document.URL
      );
    })
    .catch((error) => console.log("error", error));
}

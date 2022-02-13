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
  // get value of truth selection
  var truth = document.getElementById("GMTS_Form_Truth").value;
  // get url
  var url = document.getElementById("GMTS_Form_URL").value;
  // validity check
  if (!url.includes("ieee")) {
    alert("Invalid source. Use only sources from ieee.");
    return;
  }
  // TODO: Uncomment
  checkExisting();
}

function insertBaseDocument(highlightedword, backings, currentLink) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  if(document.getElementById("GMTS_Form_Truth").value == "true"){
    var raw = JSON.stringify({
      "fields": {
        "backings": {
          "arrayValue": {
            "values": [
              {
                "mapValue": {
                  "fields": {
                    "negativeBackings": {
                      "arrayValue": {
                        "values": [
                          
                        ]
                      }
                    },
                    "positiveBackings": {
                      "arrayValue": {
                        "values": [
                          {
                            "stringValue": backings
                          }
                        ]
                      }
                    }
                  }
                }
              }
            ]
          }
        },
        "keywords": {
          "arrayValue": {
            "values": [
              {
                "stringValue": highlightedword
              }
            ]
          }
        },
        "site_name": {
          "stringValue": currentLink
        }
      }
    });
  }
  else{
    var raw = JSON.stringify({
      "fields": {
        "backings": {
          "arrayValue": {
            "values": [
              {
                "mapValue": {
                  "fields": {
                    "negativeBackings": {
                      "arrayValue": {
                        "values": [
                          {
                            "stringValue": backings
                          }
                        ]
                      }
                    },
                    "positiveBackings": {
                      "arrayValue": {
                        "values": [
                          
                        ]
                      }
                    }
                  }
                }
              }
            ]
          }
        },
        "keywords": {
          "arrayValue": {
            "values": [
              {
                "stringValue": highlightedword
              }
            ]
          }
        },
        "site_name": {
          "stringValue": currentLink
        }
      }
    });
  }

  

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

function deleteDocument(documentID){
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  fetch("https://firestore.googleapis.com/v1/"+documentID, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function appendDocument(jsonRaw){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: jsonRaw,
    redirect: 'follow'
  };

  console.log("RAWJSON")
  console.log(jsonRaw)

  fetch("https://firestore.googleapis.com/v1beta1/projects/givemethesource/databases/(default)/documents/Sites", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

function checkExisting(){
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  
  fetch("https://firestore.googleapis.com/v1/projects/givemethesource/databases/(default)/documents/Sites", requestOptions)
    .then(response => response.text())
    .then(result => {
      const obj = JSON.parse(result)
      console.log(document.URL)
      console.log(obj.documents)
      for(x in obj.documents){
        console.log(obj.documents[x].fields.site_name.stringValue)
        if(obj.documents[x].fields.site_name.stringValue == document.URL){
          checkStatus = true
          console.log("exist")
          for(y in obj.documents[x].fields.keywords.arrayValue.values){
            if(obj.documents[x].fields.keywords.arrayValue.values[y].stringValue == 'highlighted texts'){
                if(document.getElementById("GMTS_Form_Truth").value == "true"){
                  console.log(obj.documents[x].fields.backings.arrayValue.values[y])
                  if(obj.documents[x].fields.backings.arrayValue.values[y].mapValue.fields.positiveBackings.arrayValue.values){
                    obj.documents[x].fields.backings.arrayValue.values[y].mapValue.fields.positiveBackings.arrayValue.values.push({stringValue:document.getElementById("GMTS_Form_URL").value})
                  }else{
                    obj.documents[x].fields.backings.arrayValue.values[y].mapValue.fields.positiveBackings.arrayValue['values'] = [{stringValue:document.getElementById("GMTS_Form_URL").value}]
                  }
                  
                }else{
                  if(obj.documents[x].fields.backings.arrayValue.values[y].mapValue.fields.negativeBackings.arrayValue.values){
                    obj.documents[x].fields.backings.arrayValue.values[y].mapValue.fields.negativeBackings.arrayValue.values.push({stringValue:document.getElementById("GMTS_Form_URL").value})
                  }else{
                    obj.documents[x].fields.backings.arrayValue.values[y].mapValue.fields.negativeBackings.arrayValue['values'] = [{stringValue:document.getElementById("GMTS_Form_URL").value}]
                  }
                }
                
                appendDocument(JSON.stringify({"fields":obj.documents[x].fields}))
                deleteDocument(obj.documents[x].name)
                return;
            }
          }
          obj.documents[x].fields.keywords.arrayValue.values.push({stringValue:'highlighted texts'})
          if(document.getElementById("GMTS_Form_Truth").value == "true"){
            obj.documents[x].fields.backings.arrayValue.values.push({
              "mapValue": {
                  "fields": {
                      "negativeBackings": {
                          "arrayValue": {
                              "values": [
                                
                              ]
                          }
                      },
                      "positiveBackings": {
                          "arrayValue": {
                              "values": [
                                {
                                  "stringValue": document.getElementById("GMTS_Form_URL").value
                                }
                              ]
                          }
                      }
                  }
              }
            })
          }else{
            obj.documents[x].fields.backings.arrayValue.values.push({
              "mapValue": {
                  "fields": {
                      "negativeBackings": {
                          "arrayValue": {
                              "values": [
                                {
                                  "stringValue": document.getElementById("GMTS_Form_URL").value
                                }
                              ]
                          }
                      },
                      "positiveBackings": {
                          "arrayValue": {
                              "values": [
                                
                              ]
                          }
                      }
                  }
              }
            })

          }
          console.log(obj.documents[x].fields.keywords.arrayValue.values)
          console.log(obj.documents[x].fields.backings.arrayValue.values)
          appendDocument(JSON.stringify({"fields":obj.documents[x].fields}))
          deleteDocument(obj.documents[x].name)
          return;
        }
      }
      console.log("dont_exist")
      insertBaseDocument("highlighted text",document.getElementById("GMTS_Form_URL").value,document.URL)
    })
    .catch((error) => console.log("error", error));
}

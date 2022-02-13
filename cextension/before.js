// this code will be executed before page load
var DATA;

(function() {
  console.log('before.js executed');
  retrieveBackings();
})();

function retrieveBackings(){
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  
  fetch("https://firestore.googleapis.com/v1/projects/givemethesource/databases/(default)/documents/Sites", requestOptions)
    .then(response => response.text())
    .then(result => {
      const obj = JSON.parse(result)
      for(x in obj.documents){
        if(obj.documents[x].fields.site_name.stringValue == document.URL){
          DATA = obj.documents[x].fields;
          return;
        }
      }
      DATA = {};
    })
    .catch((error) => console.log("error", error));

}
// this code will be executed when the extension's button is clicked
(function() {
  console.log('execute.js executed');
  if (document.getElementById("highlightDialog").style.display == "none"){
    console.log('open modal')
    openModal()
  }
  else{
    console.log('close modal')
    closeModal()
  }
})();

function openModal(){
  const dialog = document.getElementById("highlightDialog");
  // s = window.getSelection();
  // oRange = s.getRangeAt(0); //get the text range
  // oRect = oRange.getBoundingClientRect();
  // console.log(oRect)
  // console.log(oRect['x'])
  // console.log(oRect['y'])
  dialog.setAttribute(
    "style",`
    right: 10px;
    top: 10px;
    bottom: 10px;
    height: 90%;
    position:absolute;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
    color: #4a4a4a;
    display: block;
    padding: 1.25rem;
    `
  );

  const iframe = document.getElementById("popup-content");
  iframe.frameBorder = 0;
  if(iframe.contentDocument) { 
    doc = iframe.contentDocument; 
  } else {
    doc = iframe.contentWindow.document; 
  }

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://code.peikai.pii.at/iframe?text="+window.getSelection().toString(), requestOptions)
    .then(response => {
          // dialog.showModal()
          dialog.style.display = "block"
          return response.text()
        }
      )
    .then(result => {
      // doc.body.style.fontSize = 0.75 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      doc.body.innerHTML = "<p style='color: #363636; font-weight: 600;line-height: 1.125; font-size: 1.5em; margin-bottom: 0.5em;'>"+window.getSelection().toString()+"</p>"
      doc.body.innerHTML += "<label class='switch'> <input type='checkbox' checked> <span class='slider round'></span></label>"
      doc.body.innerHTML += "<p>"+result+"</p>"
      doc.body.innerHTML += "<input type='text' id='fname' name='fname'>"
    }
    )
    .catch(error => console.log('error', error));
} 

function closeModal() {
  modal = document.getElementById("highlightDialog")
  if (modal){
    modal.style.display = "none";
  }
}
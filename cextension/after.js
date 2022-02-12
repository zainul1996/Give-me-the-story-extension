// this code will be executed after page load
(function () {
  console.log("after.js executed");

  const modal = document.createElement("div");
  modal.className = "box";
  modal.setAttribute("id", "highlightDialog");
  modal.innerHTML = `
  <label class='switch'> <input type='checkbox' checked> <span class='slider round'></span></label>
  <input type='text' id='fname' name='fname'>
  <button type='button' id='submit' name='submit'>Submit</button>
  <div class=modalFooter>
  <strong>Give Me The Source</strong> <br>by RushHour2022
  </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = "none";
})();

function mouseUp() {
  if (window.getSelection().toString() == "") {
    console.log("there is no selected text");
  } else {
    console.log(window.getSelection().toString());
    if (event.shiftKey) {
      console.log("Shift held");
      openModal();
    } else {
      console.log("Shift not held");
    }
  }
}

// function openModal(){
//   const dialog = document.getElementById("highlightDialog");
//   // s = window.getSelection();
//   // oRange = s.getRangeAt(0); //get the text range
//   // oRect = oRange.getBoundingClientRect();
//   // console.log(oRect)
//   // console.log(oRect['x'])
//   // console.log(oRect['y'])
//   dialog.setAttribute(
//     "style",`
//     right: 10px;
//     top: 10px;
//     bottom: 10px;
//     height: 90%;
//     position:absolute;
//     background-color: white;
//     border-radius: 6px;
//     box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
//     color: #4a4a4a;
//     display: block;
//     padding: 1.25rem;
//     `
//   );

//   const iframe = document.getElementById("popup-content");
//   iframe.frameBorder = 0;
//   if(iframe.contentDocument) {
//     doc = iframe.contentDocument;
//   } else {
//     doc = iframe.contentWindow.document;
//   }

//   var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };

//   fetch("https://code.peikai.pii.at/iframe?text="+window.getSelection().toString(), requestOptions)
//     .then(response => {
//           // dialog.showModal()
//           dialog.style.display = "block"
//           return response.text()
//         }
//       )
//     .then(result => {
//       // doc.body.style.fontSize = 0.75 * parseFloat(getComputedStyle(document.documentElement).fontSize);
//       doc.body.innerHTML = "<p style='color: #363636; font-weight: 600;line-height: 1.125; font-size: 1.5em; margin-bottom: 0.5em;'>"+window.getSelection().toString()+"</p>"
//       doc.body.innerHTML += "<p>"+result+"</p>"
//     }
//     )
//     .catch(error => console.log('error', error));
// }

// const closeModal = () => {
//   modal = document.getElementById("highlightDialog")
//   if (modal){
//     modal.style.display = "none";
//   }
// }

// document.addEventListener("mouseup", mouseUp);
// document.addEventListener("keypress", showModal2);
// document.addEventListener("click", closeModal);

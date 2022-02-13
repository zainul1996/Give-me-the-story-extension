// this code will be executed after page load
(function () {
  console.log("after.js executed");

  const modal = document.createElement("div");
  modal.className = "GMTS_Modal";
  modal.setAttribute("id", "highlightDialog");
  modal.innerHTML = `
  <p><strong>For</strong></p>
  <div class="box GMTS_Table">
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
      <tbody id="pos_table">
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      <tr><td>hi</td></tr>
      </tbody>
    </table>

  </div>

  <p><strong>Against</strong></p>
  <div class="box GMTS_Table">
    <table class="table">
      <tbody id="neg_table">
      <tbody>
        
      </tbody>
    </table>
  </div>

    <div id="GMTS_Form" class=box>
      <p class="subtitle is-size-5">
          Add new source for 
          <select id="GMTS_Form_Truth" name="truth">
            <option value="true">True</option>
            <option value="false">False</option>
          </select>:
      </p>

      <div class="has-text-centered">
        <label for="Truth">
          <input class="input is-right" type='text' id='GMTS_Form_URL' name='fname'>
        </label>
        <br>
        <button class="button is-small is-right" type='button' id='submit' name='submit'>Submit</button>
      </div>
    </div>

    <div class=modalFooter>
      <p class="subtitle is-size-7">
      <strong>Give Me The Source</strong> <br>by RushHour2022
      <p>
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

console.log(lastHighlightedText)
$('p, h1, h2, span, em, li').on("mouseup",
  function () {
    var selection = getSelectedText();
    // check if selection is atleast 5 words long
    if (selection.split(" ").length > 5) {
      lastHighlightedText = selection;
      console.log(lastHighlightedText)
      var replacement = $('<span></span>')
        .attr({ 'class': 'hl' })
        .attr({ 'onclick': 'document.getElementById("highlightDialog").style.display = "block";return false;' }).html(selection);
      var replacementHtml = $('<div>').append(replacement.clone()).remove().html();
      $(this).html($(this).html().replace(selection, replacementHtml));
    }
  }
);

// if class hl is clicked
$('.hl').on('click', function () {
  console.log("clicked");
  if (document.getElementById("highlightDialog").style.display == "none") {
    document.getElementById("highlightDialog").style.display = "block";
  } else {
    document.getElementById("highlightDialog").style.display = "none";
  }
})


//Grab selected text
function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  }
  else if (document.getSelection) {
    return document.getSelection();
  }
  else if (document.selection) {
    return document.selection.createRange().text;
  }
}

$('body').keyup(function (e) {
  if (e.keyCode == 8) {
    if ($('.hl').length > 0) {
      removeHighlights()
    }
    else {
      reApplyHighlights()
    }
  }
})


function removeHighlights() {
  $('.hl').each(function () {
    $(this).removeClass('hl');
    $(this).addClass('nlh');
    $(this).removeAttr('onclick');
  })
}

function reApplyHighlights() {
  $('.nlh').each(function () {
    $(this).addClass('hl');
    $(this).removeClass('nlh');
    $(this).attr('onclick', 'alert("clicked"); return false;');
  })
}

$('#submit').click(function () {
  if (lastHighlightedText != "") {
    console.log("Checking existing")
    console.log("preparing to insert" + lastHighlightedText)
    checkExisting();
  }
})


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

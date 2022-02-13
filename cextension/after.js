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

console.log(lastHighlightedText);
$("p, h1, h2, span, em, li").on("mouseup", function () {
  var selection = getSelectedText();
  // check if selection is atleast 5 words long
  if (selection.split(" ").length > 5) {
    lastHighlightedText = selection;
    console.log(lastHighlightedText);
    var replacement = $("<span></span>").attr({ class: "hl" }).html(selection);

    openModal(document.getElementById("highlightDialog"));
    var replacementHtml = $("<div>")
      .append(replacement.clone())
      .remove()
      .html();
    $(this).html($(this).html().replace(selection, replacementHtml));
  }
});

// if class hl is clicked
$(".hl").on("click", function () {
  console.log("clicked");
  if (document.getElementById("highlightDialog").style.display == "none") {
    document.getElementById("highlightDialog").style.display = "block";
  } else {
    document.getElementById("highlightDialog").style.display = "none";
  }
});

//Grab selected text
function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.getSelection) {
    return document.getSelection();
  } else if (document.selection) {
    return document.selection.createRange().text;
  }
}

$("body").keyup(function (e) {
  if (e.keyCode == 8) {
    if ($(".hl").length > 0) {
      removeHighlights();
    } else {
      reApplyHighlights();
    }
  }
});

function removeHighlights() {
  $(".hl").each(function () {
    $(this).removeClass("hl");
    $(this).addClass("nlh");
    $(this).removeAttr("onclick");
  });
}

function reApplyHighlights() {
  $(".nlh").each(function () {
    $(this).addClass("hl");
    $(this).removeClass("nlh");
    $(this).attr("onclick", 'alert("clicked"); return false;');
  });
}

$("#submit").click(function () {
  // validation
  if (lastHighlightedText == "") {
    alert("Nothing was highlighted");
  }

  var url = document.getElementById("GMTS_Form_URL").value;
  if (!url.includes("https://ieeexplore.ieee.org/document/")) {
    alert("Only sources from ieee was accepted");
  }

  var posTable = document.getElementById("pos_table");
  posTable.innerHTML +=
    `
      <tr>
      <td><a href=` +
    url +
    `>` +
    url +
    `</a></td>
      </tr>
    `;

  console.log("Checking existing");
  checkExisting();
});

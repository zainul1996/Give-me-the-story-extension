// this code will be executed when the extension's button is clicked
(function () {
  console.log(DATA)
  console.log("execute.js executed");
  //document.getElementById("submit").addEventListener("click", submitToFirebase);

  const modal = document.getElementById("highlightDialog");

  // toggle variable to track whether modal is open or not


  // if modal is open, close it
  if (!toggle) {
    // if there is at least one highlighted word
    toggle = true;
    if (hiddenhighlights) {
      $(".nlh").each(function () {
        $(this).addClass("hl");
        $(this).removeClass("nlh");
        $(this).attr("onclick", 'alert("clicked"); return false;');
      });
    }
    else {
      // for each object in DATA.keywords.arrayValue.values
      for (var item in DATA["keywords"]["arrayValue"]["values"]) {
        selection = DATA["keywords"]["arrayValue"]["values"][item]["stringValue"]
        $element = $('div>:contains(' + selection + ')')
        console.log($element)
        var replacement = $("<span></span>")
          .attr({ class: "hl" })
          .attr({
            onclick:
              'document.getElementById("highlightDialog").style.display = "block";return false;',
          })
          .html(selection);
        var replacementHtml = $("<div>")
          .append(replacement.clone())
          .remove()
          .html();
        $($element).html($($element).html().replace(selection, replacementHtml));
      }
    }
  }
  else {
    toggle = false;
    $(".hl").each(function () {
      $(this).removeClass("hl");
      $(this).addClass("nlh");
      $(this).removeAttr("onclick");
    });
  }

  // if (modal && modal.style.display == "none") {
  //   openModal(modal);
  // } else {
  //   closeModal(modal);
  // }
})();

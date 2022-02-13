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
    var x = document.getElementById("snackbar");
    x.innerHTML = "Toggled on GMTS";
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
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
          .html(selection);
        var replacementHtml = $("<div>")
          .append(replacement.clone())
          .remove()
          .html();
        $($element).html($($element).html().replace(selection, replacementHtml));
        $('.hl').on('click', (event) => {
          lastHighlightedText = $(event.target).text()
          openModal(document.getElementById("highlightDialog"));
        })
      }
    }
  }
  else {
    toggle = false;
    var x = document.getElementById("snackbar");
    x.innerHTML = "Toggled off GMTS";
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    closeModal(document.getElementById("highlightDialog"));
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

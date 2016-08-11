window.onload = tangentsInit;

function tangentsInit() {
  var allTangentButtons = document.querySelectorAll('button.tangent-button');
  if (allTangentButtons.length) {
    for (var i = 0; i < allTangentButtons.length; i++) {
      allTangentButtons[i].addEventListener('click', toggleTangent, false);
    }
  }

  function toggleTangent(evt) {
    var tangentButton = evt.target,
      tangentContent = tangentButton.nextElementSibling,
      tangentContentHeight = tangentContent.clientHeight;
    if (tangentContentHeight === 0) {
      Velocity(tangentContent, "slideDown", { duration: 300 });
    } else {
      Velocity(tangentContent, "slideUp", { duration: 300 });
    }
  }
}


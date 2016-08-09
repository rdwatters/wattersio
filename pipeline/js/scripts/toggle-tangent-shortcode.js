var allTocLinks = document.querySelectorAll('aside#toc a');


if (allTocLinks.length) {
  for (var i = 0; i < allTocLinks.length; i++) {
    allTocLinks[i].addEventListener('click', smoothVelScrolling, false);
  }
}

function smoothVelScrolling(evt) {
  var clickedLink = evt.target.href.split('#')[1];
  var targetLink = document.getElementById(clickedLink);
  Velocity(targetLink, "scroll", { duration: 300, offset: 0 });
}

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


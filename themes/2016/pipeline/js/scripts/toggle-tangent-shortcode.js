window.onload = tangentsInit;

function tangentsInit() {
  var allTangentButtons = document.querySelectorAll('.tangent-title');
  if (allTangentButtons.length) {
    for (var i = 0; i < allTangentButtons.length; i++) {
      allTangentButtons[i].addEventListener('click', toggleTangent, true);
    }
  }

  function toggleTangent(evt) {
    var tangentContent,
      rotateArrow,
      targ = evt.target,
      clickedClass = targ.className;
    if (clickedClass !== 'tangent-title') {
      tangentContent = targ.parentNode.nextElementSibling;
      rotateArrow = targ.parentNode.lastElementChild;
    } else {
      tangentContent = targ.nextElementSibling;
      rotateArrow = targ.lastElementChild;
    }
    var tangentContentHeight = tangentContent.clientHeight;
    if (tangentContentHeight === 0) {
      Velocity(tangentContent, "slideDown", { duration: 300 });
    } else {
      Velocity(tangentContent, "slideUp", { duration: 300 });
    }
    rotateArrow.classList.toggle('open');
  }
}

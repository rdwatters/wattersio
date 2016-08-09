document.querySelector('.sidebar-toggle-wrapper').addEventListener('click', navToggle, false);
document.querySelector('.all-content-wrapper').addEventListener('click', navToggleCheck, false);
var divsToMove = document.querySelectorAll('.sidebar-toggle-wrapper,.site-navigation,.all-content-wrapper,#toggle-search');

function navToggle() {
  for (var i = 0; i < divsToMove.length; i++) {
    divsToMove[i].classList.toggle('open');
  }
}

function navToggleCheck() {
  var navIsOpen = document.querySelector('.all-content-wrapper.open') ? true : false;
  if (navIsOpen) {
    for (var i = 0; i < divsToMove.length; i++) {
      divsToMove[i].classList.remove('open');
    }
  }
}

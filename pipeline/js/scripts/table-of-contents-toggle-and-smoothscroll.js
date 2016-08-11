var tocTog = document.getElementById('toggle-toc');
var allTocLinks = document.querySelectorAll('aside#toc a');
var tocExists = document.querySelector('aside.toc') ? true : false;

if (allTocLinks.length > 3) {
  tocTog.addEventListener('click', toggleToc, false);
  for (var i = 0; i < allTocLinks.length; i++) {
    allTocLinks[i].addEventListener('click', smoothVelScrolling, false);
  }
} else if (allTocLinks.length < 3 && tocExists) {
  document.querySelector('aside.toc').remove();
  tocTog.remove();
}

function smoothVelScrolling(evt) {
  var clickedLink = evt.target.href.split('#')[1];
  var targetLink = document.getElementById(clickedLink);
  Velocity(targetLink, "scroll", { duration: 300, offset: 0 });
}

function toggleToc(evt) {
  evt.preventDefault();
  document.querySelector('aside.toc').classList.toggle('open-toc');
  document.getElementById('toggle-toc').classList.toggle('open-toc');
}

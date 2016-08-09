var tocTog = document.getElementById('toggle-toc');
var tocLis = document.querySelectorAll('aside.toc a');
var tocLength = tocLis.length;


if (tocTog && tocLis.length > 3) {
  tocTog.addEventListener('click', toggleToc, false);
  // for (var i = 0; i < tocLis.length; i++) {
  //   tocLis[i].addEventListener('click', smoothScrollLinks, false);
  // }
} else if (tocTog && tocLis.length < 3) {
  document.querySelector('aside.toc').remove();
  tocTog.remove();
}

function toggleToc(evt) {
  evt.preventDefault();
  document.querySelector('aside.toc').classList.toggle('open-toc');
  document.getElementById('toggle-toc').classList.toggle('open-toc');
}

// function smoothScrollLinks(evt) {
//   evt.preventDefault();
//   evt.stopPropagation();
//   var textTarget = evt.target.href.split('#')[1];
//   var scrollTarget = ("#" + textTarget).toString();
//   TweenLite.to(window, .4, {scrollTo:scrollTarget});
// }
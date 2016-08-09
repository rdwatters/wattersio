//don't run scroll event on mobile devices
var hero = document.querySelector('.hero');
var siteLogo = document.querySelector('.site-logo.home-link:not(.form)');
if (hero && !isMobile) {
  window.addEventListener('scroll', changeLogo, false);
}

function changeLogo() {
  var heroHeight = hero.offsetHeight;
  var scrollPosition = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollPosition;
  if (scrollPosition > heroHeight - 40) {
    siteLogo.classList.add('lightbg');
  } else {
    siteLogo.classList.remove('lightbg');
  }

}

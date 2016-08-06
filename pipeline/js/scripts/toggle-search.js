window.onload = pageNotFoundTest;

document.getElementById('toggle-search').addEventListener('click', toggleSearch, false);
document.getElementById('close-search').addEventListener('click', toggleSearch, false);
document.addEventListener('keyup', keystrokeSearchToggle, false);
document.getElementById('search-input').addEventListener('keyup', setSearchInLocalStorage, false);

//keep IE from autofocsing on search input on page load

$(document).ready(function() {
  $('#search-input').blur();
});

//test for 404 Page

function pageNotFoundTest() {
  var fourTest = new RegExp('Page not found', 'i');
  var docTitle = document.title.toString();
  var currentUrl = window.location.href;
  if (fourTest.test(docTitle)) {
    document.getElementById('search-results').innerHTML = '<li class="search-result notfound"><h5><strong>It looks like ' + currentUrl + ' does not exist. Please try searching for another page.</strong></h5></li>';
    toggleSearch(null);
  }

}

//toggle search based on keystroke
function keystrokeSearchToggle(thekey) {
  var boardKey = thekey.keyCode;
  var searchIsOpen = document.querySelector('.search-form.open') ? true : false;
  if (boardKey == 27 && searchIsOpen) {
    document.querySelector('.search-form').classList.remove('open');
  }
}

function toggleSearch(evt) {
  var searchForm = document.getElementById('site-search');
  var searchInput = document.getElementById('search-input');
  var windowHash = window.location.hash;
  var searchOpen = searchForm.classList.contains('open') ? true : false;
  var searchValue = localStorage.getItem('search_term') ? localStorage.getItem('search_term') : '';
  if (evt !== null) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  if (!searchOpen) {
    window.location.hash = 'search';
    searchInput.value = searchValue;
    lunrSearch();
    searchForm.classList.add('open');
  } else {
    window.location.hash = '';
    searchForm.classList.remove('open');
  }
}
// function toggleSearch(evt) {
//     var searchValue = localStorage.getItem('rw_search_term');
//     var searchForm = document.getElementById('site-search');
//     var searchInput = document.getElementById('search-input');
//     if (evt !== null) {
//         evt.preventDefault();
//         evt.stopPropagation();
//         if (searchValue != null) {
//             searchInput.value = searchValue;
//             lunrSearch();
//         }
//         if (!searchForm.classList.contains('open')) {
//             searchInput.focus();
//         }
//         searchForm.classList.toggle('open');
//     } else {
//         searchInput.focus();
//         searchForm.classList.toggle('open');
//     }
//     return false;
// }

function setSearchInLocalStorage() {
  var sTerm = document.getElementById('search-input').value;
  localStorage.setItem('search_term', sTerm);
}

//remove "Press escape to close div on mobile devices."
//theOs refers to a global variable from _globals.js
if (isMobile) {
  document.querySelector('.close-with-escape').classList.add('hidden');
}

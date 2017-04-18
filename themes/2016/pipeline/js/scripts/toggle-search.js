window.onload = pageNotFoundTest;
window.onload = checkForSearchHash;
window.onpopstate = checkForSearchHash;
var searchForm = document.getElementById('site-search');
var searchToggle = document.getElementById('toggle-search');
var searchInput = document.getElementById('search-input');
var localTerm = localStorage.getItem('search_term') ? localStorage.getItem('search_term') : '';
searchToggle.addEventListener('click', toggleSearch, false);
searchInput.addEventListener('keyup', setSearchInLocalStorage, false);

document.onkeydown = function(evt) {
  var searchIsOpen = searchForm.classList.contains('open');
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = evt.key == "Escape";
  } else {
    isEscape = evt.keyCode == 27;
  }
  if (isEscape && searchIsOpen) {
    searchForm.classList.remove('open');
    searchInput.blur();
  }
};

function checkForSearchHash() {
  if (window.location.hash.startsWith('#search')) {
    searchInput.value = localTerm;
    lunrSearch();
    if (!searchForm.classList.contains('open')) {
      searchForm.classList.add('open');
      searchInput.focus();
    }
  } else if (searchForm.classList.contains('open')) {
    searchForm.classList.remove('open');
    searchInput.blur();
  }
}

function pageNotFoundTest() {
  var fourTest = new RegExp('Page not found', 'i');
  var docTitle = document.title;
  var currentUrl = window.location.href;
  if (fourTest.test(docTitle)) {
    document.getElementById('search-results').innerHTML = '<li class="search-result notfound"><h5><strong>It looks like ' + currentUrl + ' does not exist. Please try searching for another page.</strong></h5></li>';
    toggleSearch(null);
  }
}

function toggleSearch(evt) {
  if (evt !== null) {
    evt.preventDefault();
  }
  var searchIsOpen = searchForm.classList.contains('open') ? true : false;
  localTerm = localStorage.getItem('search_term') ? localStorage.getItem('search_term') : '';
  searchInput.value = localTerm;
  if (searchIsOpen) {
    searchForm.classList.remove('open');
    window.location.hash = "#";
    searchInput.blur();
  } else {
    searchForm.classList.add('open');
    window.location.hash = "#search";
    lunrSearch();
    searchInput.focus();
  }
}

function setSearchInLocalStorage() {
  var sTerm = searchInput.value;
  var queryTerm = searchInput.value.split(' ').join('+');
  localStorage.setItem('search_term', sTerm);
}
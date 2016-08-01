document.getElementById('toggle-search').addEventListener('click', toggleSearch, false);
document.getElementById('close-search').addEventListener('click', toggleSearch, false);
document.addEventListener('keyup', keystrokeSearchToggle, false);
document.getElementById('search-input').addEventListener('keyup', setSearchInLocalStorage, false);

//toggle search based on keystroke
function keystrokeSearchToggle(thekey) {
    var boardKey = thekey.keyCode;
    var searchIsOpen = document.querySelector('.search-form.open') ? true : false;
    if (boardKey == 27 && searchIsOpen) {
    	document.querySelector('.search-form').classList.remove('open');
    }
}

function toggleSearch(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var searchValue = localStorage.getItem('rw_search_term');
    var searchForm = document.getElementById('site-search');
    var searchInput = document.getElementById('search-input');

    if(searchValue != null){
    	searchInput.value = searchValue;
    	lunrSearch();
    }
    searchForm.classList.toggle('open');
    if (!searchForm.classList.contains('open')) {
        searchInput.value = '';
    } else { document.getElementById('search-input').focus(); }
    return false;
}

function setSearchInLocalStorage() {
    var sTerm = document.getElementById('search-input').value;
    localStorage.setItem('rw_search_term', sTerm);
}

//remove "Press escape to close div on mobile devices."
//theOs refers to a global variable from _globals.js
if (isMobile) {
    document.querySelector('.close-with-escape').classList.add('hidden');
}

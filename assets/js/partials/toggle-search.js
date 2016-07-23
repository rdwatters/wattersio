document.getElementById('toggle-search').addEventListener('click', toggleSearch, false);
document.getElementById('close-search').addEventListener('click', toggleSearch, false);

function toggleSearch(evt) {
    console.log("registering!");
    evt.preventDefault();
    var searchForm = document.getElementById('site-search');
    var searchInput = document.getElementById('search-input');
    searchForm.classList.toggle('open');
    if (!searchForm.classList.contains('open')) {
        searchInput.value = '';
    } else { document.getElementById('search-input').focus(); }
}

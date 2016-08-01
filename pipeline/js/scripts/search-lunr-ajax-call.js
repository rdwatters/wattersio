var searchData;
var searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', lunrSearch, true);
window.index = lunr(function() {
    this.field('id');
    this.field('url');
    this.field('title', { boost: 100 });
    this.field('subtitle');
    this.field('description');
    this.field('tags', { boost: 30 });
    this.field('content', { boost: 10 });
});
var indexLocation = "/assets/site-index.json";
var searchReq = new XMLHttpRequest();
searchReq.open('GET', indexLocation, true);
searchReq.onload = function() {
    if (this.status >= 200 && this.status < 400) {
        searchData = JSON.parse(this.response);
        searchData.forEach(function(obj, index) {
            obj['id'] = index;
            window.index.add(obj);
        });
    } else {
        console.log("Failed status for site-index.js.");
    }
};
searchReq.onerror = function() {
    console.log("Error when attempting to load site-index.json.");
}
searchReq.send();

function lunrSearch(event) {
    var query = document.getElementById("search-input").value;
    var searchResults = document.getElementById("search-results");
    var resultsLength = document.getElementById('results-length');
    if (query.length < 3) {
        searchResults.innerHTML = '';
        resultsLength.innerHTML = '';
    }
    if (query.length > 2) {
        var matches = window.index.search(query);
        displayResults(matches);
    }
}

function displayResults(results) {
    var searchResults = document.getElementById('search-results');
    var inputVal = document.getElementById('search-input').value;
    var resultsLength = document.getElementById('results-length');
    if (results.length) {
        // console.log(results.length);
        searchResults.innerHTML = '';
        resultsLength.innerHTML = '';
        results.forEach(function(result) {
            var item = window.searchData[result.ref];
            var appendString = '<li class=\"search-result\"><a href=\"' + item.url + '\"><h5>' + item.title + '</h5>' + '<p>' + item.description + '</p></li>';
            searchResults.innerHTML += appendString;
        })
        if (results.length > 1) {
            resultsLength.innerHTML = '<strong>' + results.length + '</strong>' + ' results for <strong>\"' + inputVal + '\"</strong>';
        } else {
            resultsLength.innerHTML = '<strong>' + results.length + '</strong>' + ' result for <strong>\"' + inputVal + '\"</strong>';
        }
    } else {
        searchResults.innerHTML = '<li class=\"search-result none\">No results found for <span class=\"input-value\">' + inputVal + '</span>. Please check spelling and spacing.</li>';
        resultsLength.innerHTML = '';
    }
}

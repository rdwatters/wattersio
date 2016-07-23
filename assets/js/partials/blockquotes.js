(function() {
    //assign all blockquote content to an html collection/variable
    var blockQuotes = document.querySelectorAll('blockquote > p');
    //create new regex test for ' - ' (with one whitespace on each side so as not to accidentally grab hyphenated words as well)
    var hyphenTest = new RegExp(/\s\-\s/);
    //iterate through all html blocks within the blockquotes html collection
    if (blockQuotes) {
        for (var i = 0; i < blockQuotes.length; i++) {
            //check for ' - ' in the blockquote's text content
            if (hyphenTest.test(blockQuotes[i].textContent)) {
                //if true, split existing inner HTML into two-part array
                //newQuoteContent === text leading up to hyphen
                var newQuoteContent = blockQuotes[i].innerHTML.split(' - ')[0];
                //newAuthorAttr === text after hyphen
                var newAuthorAttr = blockQuotes[i].innerHTML.split(' - ')[1];
                //fill blockquote paragraph with new content, but now with a <cite> wrapper around the author callout.
                blockQuotes[i].innerHTML = newQuoteContent + '<cite class="blockquote-citation"> &#x2015; ' + newAuthorAttr + '</cite>';
            }
        }
    }
})();
//style images based on "$=" in alt text.
//

(function imageClasses() {
    var allImgs = document.querySelectorAll('article img');
    if (allImgs.length < 1) {
        return;
    } else {
        applyAltClasses(allImgs);
    }

    function applyAltClasses(images) {
        for (var i = 0; i < images.length; i++) {
            if (images[i].alt.indexOf('$=') > 0) {
                var justText = images[i].alt.split('$=')[0];
                var newClass = images[i].alt.split('$=')[1];
                images[i].setAttribute('alt', justText);
                images[i].className = newClass;
            }
        }
    }
})();

$("iframe[src*='youtube.com']").each(function() {
    $(this).wrap("<div class='videoWrapper'></div>");
});

$(document).ready(function() {
    var curl = window.location.pathname;
    if (curl === "/" || curl === "/test-theme/" || curl === "/index.html") {
        $('h1.textLogo.textLogo--frontpage.animated').addClass('fadeIn');
    }
});

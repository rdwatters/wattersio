(function targetBlank() {
    // remove subdomain of current site's url and setup regex
    var internal = location.host.replace("www.", "");
    internal = new RegExp(internal, "i");
    var mailTo = new RegExp(/mailto:/);
    //RegEx to check for PDFs, Word docs, and Excel Spreadsheet
    var printDocs = new RegExp(/(.pdf|.docx|.doc|.xlsx|.xls)$/);
    var a = document.getElementsByTagName('a'); // then, grab every link on the page
    //iterate through the HTML collection of all links
    for (var i = 0; i < a.length; i++) {
        var theHost = a[i].host;
        //if the href ends with any of the above file formats, set target="_blank"
        if (printDocs.test(a[i].href)) {
            a[i].setAttribute('target', '_blank');
        } else if (mailTo.test(a[i].href)) {
            a[i].setAttribute('target', '');
        }
        // uncomment the following to make all external links open in new tab/window. - not necessary if setting this same variable within config.toml for the BlackFriday settings with Hugo.
        // make sure the href doesn't contain current site's host
        else if (!internal.test(theHost)) {
            a[i].setAttribute('target', '_blank'); // if it doesn't, set attributes
        }
    }
})();

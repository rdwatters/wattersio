//some temporary js for the rightpoint portfolio page
(function() {
    let allLinks = document.getElementsByTagName('a');
    for (var i = 0; i < allLinks.length; i++) {
        var exLinkTest = /(.pdf|.png|.jpg|.xlsx)/g;
        if (exLinkTest.test(allLinks[i].getAttribute('href'))) {
            allLinks[i].setAttribute('target', "_blank");
        }
    }
})();

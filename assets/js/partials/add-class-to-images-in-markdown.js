(function imageClasses() {
    var allImgs = document.getElementsByTagName('img');
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
$(document).ready(function() {
    var toggleWrapper = document.querySelector('.modal-toggle-wrapper');
    if (toggleWrapper) {
        toggleWrapper.onclick = function() {
            var modalOpen = document.querySelector('.fullscreenModal.active') ? true : false;
            var theToc = document.querySelector('aside.toc');
            var visibleToc = document.querySelector('aside.toc.fadeIn');
            var tocToggle = document.getElementById('toggle-toc');
            document.querySelector('.modal-toggle-bubble').classList.toggle('active');
            document.querySelector('.social-wrapper').classList.toggle('active');
            document.querySelector('.modal-toggle-wrapper').classList.toggle('active');
            document.querySelector('.modal-toggle-bubbleShadow').classList.toggle('active');
            document.querySelector('.modal-toggle-close-wrapper').classList.toggle('active');
            // document.querySelector('.social-media-share').classList.toggle('active');
            document.querySelector('.share-close').classList.toggle('active');
            document.querySelector('.social-media-share.animated').classList.toggle('fadeInDown');
            // document.querySelector('.social-media-share-list.animated').classList.toggle('fadeInDown');
            if (visibleToc) {
                visibleToc.classList.remove('fadeIn');
            }
            if (modalOpen && theToc) {
                theToc.classList.add('fadeIn');
            }
            if (tocToggle) {
                tocToggle.classList.toggle('hide-toggle');
            }
            console.log(modalOpen);
        }
    }

    // Prevent default anchor event and make a share popup
    $.fn.sharePopup = function(e, intWidth, intHeight, blnResize) {

        e.preventDefault();
        intWidth = intWidth || '750';
        intHeight = intHeight || '500';
        strResize = (blnResize ? 'yes' : 'no');

        //// Set title and open popup with focus on it
        var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
            strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
            objWindow = window.open(this.attr('href'), strTitle, strParam).focus();
    }

    $('.shareButton:not(.shareButton--email)').on("click", function(e) {
        $(this).sharePopup(e);
    });
});

// Show modal toggle and toggle class for TOC after scrolling 300px
$(document).scroll(function() {
    var docHeight = $(document).height();
    var winHeight = window.outerHeight;
    var fromBottom = docHeight - winHeight;
    $('aside.toc, #toggle-toc').toggleClass('fadeIn', $(document).scrollTop() >= 300 && $(document).scrollTop() <= fromBottom);
});

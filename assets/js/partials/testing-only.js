$('#next-link-toggle').click(function(evt) {
    evt.preventDefault();
    $('.post-nav.next-post').toggleClass('open');
});

$('#prev-link-toggle').click(function(evt) {
    evt.preventDefault();
    $('.post-nav.prev-post').toggleClass('open');
});

var postWrapper = document.querySelector('.postWrapper');
if (postWrapper) {
    postWrapper.addEventListener('click', removeNavs, false);
}

function removeNavs() {
    var prevLinkOpen = document.querySelector('.post-nav.prev-post.open') !== null ? true : false;
    var nextLinkOpen = document.querySelector('.post-nav.next-post.open') !== null ? true : false;
    var tocToggle = document.getElementById('toggle-toc');
    var tocToggleOpen = (tocToggle && tocToggle.classList.contains('open-toc')) ? true : false;
    console.log(tocToggleOpen);
    if (prevLinkOpen) {
        document.querySelector('.post-nav.prev-post.open').classList.remove('open');
    }
    if (nextLinkOpen) {
        document.querySelector('.post-nav.next-post.open').classList.remove('open');
    }
    if (tocToggleOpen) {
        document.getElementById('toggle-toc').classList.remove('open-toc');
        document.querySelector('aside.toc').classList.remove('open-toc');
    }

}

// $('.all-content-wrapper').on('click', function() {
//      console.log("Hello");
//     if ($('.next-post').hasClass('open')) {
//         $('.next-post').removeClass('open');
//     }
//     if ($('.prev-post').hasClass('open')) {
//         $('.prev-post').removeClass('open');
//     }
// }, true);

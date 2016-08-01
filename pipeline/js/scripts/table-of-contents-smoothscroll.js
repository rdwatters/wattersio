//using velocity.js
// (function() {
//     if (!document.querySelector('aside.toc')) {
//         return;
//     } else {
//         var allTocHeaders = document.querySelectorAll('.toc a');
//         for (var i = 0; i < allTocHeaders.length; i++) {
//             allTocHeaders[i].addEventListener('click', tocScroll, false);
//         }
//     }
//     function tocScroll(evt) {
//     		evt.preventDefault();
//         var targetHeadline = evt.target.getAttribute('href').substr(1);
//         var targetHeader = document.getElementById(targetHeadline);
//         targetHeader.velocity('scroll', {duration: 750, offset: 50});
//     }
// })();
$(document).ready(function() {
    // bind click event to all internal page anchors
    $('.toc a').on('click', function(e) {
        // prevent default action and bubbling
        e.preventDefault();
        e.stopPropagation();
        // set target to anchor's "href" attribute
        var target = $(this).attr('href');
        if (target == "#page-top") {
        		$(target).velocity('scroll', {
        			duration: 500,
        			offset: 0,
        			easing: 'ease-in-out'
        		})
        } else {
            // scroll to each target
            $(target).velocity('scroll', {
                duration: 500,
                offset: -60,
                easing: 'ease-in-out'
            });
        }
    });
});

$('#toggle-toc').click(function(evt) {
    evt.preventDefault();
    $(this).toggleClass('open-toc');
    $('aside.toc').toggleClass('open-toc');
});

$(document).ready(function() {
    var tocLength = $('aside.toc ul li ul li').length;
    if (tocLength < 3) {
        $('aside.toc').remove();
        $('#toggle-toc').remove();
    }
});

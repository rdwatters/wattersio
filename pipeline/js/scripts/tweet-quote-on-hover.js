// // window.onload = tweetQuote;
// (function tweetQuote() {
//     if (location.pathname == "/") {
//         return;
//     } else {
//         ! function(d, s, id) {
//             var js, fjs = d.getElementsByTagName(s)[0];
//             if (!d.getElementById(id)) {
//                 js = d.createElement(s);
//                 js.id = id;
//                 js.src = "//platform.twitter.com/widgets.js";
//                 fjs.parentNode.insertBefore(js, fjs);
//             }
//         }(document, "script", "twitter-wjs");

//         // Blockquote tweet this button on hover

//         $('.content-wrapper blockquote').hover(function() {

//             var blockQuoteText = $(this).text();
//             var currentUrl = window.location;

//             $(this).append('<div class="tweet-quote"><a href="https://twitter.com/share" data-text="' + blockQuoteText + '"  class="twitter-share-button" data-via="ryandwatters" data-url="' + currentUrl + '" data-size="large" data-count="vertical"></a></div>');

//             $('.tweet-quote').hide().fadeIn(0);

//             twttr.widgets.load();

//         }, function() {
//             $('.tweet-quote').remove();
//         });
//     }
// })();

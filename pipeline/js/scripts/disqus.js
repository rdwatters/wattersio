// (function() {
//   // Don't inject Disqus on localhost or netlify to keep Disqus comments clean.
//   var netlifyLocalTest = new RegExp(/(netlify|localhost)/i);
//   var disqThread = document.getElementById('disqus_thread');
//   if (!disqThread || netlifyLocalTest.test(window.location.hostname)) {
//     console.log("No Disqus Comments in local dev or in netlify URLs");
//     return;
//   } else {
//     var disqus_config = function() {
//       this.page.url = "{{ .Permalink }}"; // Replace PAGE_URL with your page's canonical URL variable
//       this.page.identifier = "{{.Title}}"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
//     };

//     var dsq = document.createElement('script');
//     dsq.type = 'text/javascript';
//     dsq.async = true;
//     var disqus_shortname = 'ryanwattersio';
//     dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
//     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
//   }
// })();

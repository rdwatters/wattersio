// (function() {
//   var toggleWrapper = document.querySelector('.modal-toggle-wrapper');
//   if (toggleWrapper) {
//     toggleWrapper.onclick = function() {
//       var modalOpen = document.querySelector('.fullscreenModal.active') ? true : false;
//       var theToc = document.querySelector('aside.toc');
//       var visibleToc = document.querySelector('aside.toc.fadeIn');
//       var tocToggle = document.getElementById('toggle-toc');
//       var toggleDivs = document.querySelectorAll('.modal-toggle-bubble,.social-wrapper,.modal-toggle-wrapper,.modal-toggle-bubbleShadow,.modal-toggle-close-wrapper,.share-close');
//       for (var i = 0; i < toggleDivs.length; i++) {
//         toggleDivs[i].classList.toggle('active');
//       }
//       document.querySelector('.social-media-share.animated').classList.toggle('fadeInDown');
//       if (visibleToc) {
//         visibleToc.classList.remove('fadeIn');
//       }
//       if (modalOpen && theToc) {
//         theToc.classList.add('fadeIn');
//       }
//       if (tocToggle) {
//         tocToggle.classList.toggle('hide-toggle');
//       }
//     }
//   }
// })();

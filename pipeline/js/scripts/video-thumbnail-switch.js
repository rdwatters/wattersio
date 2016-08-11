var allVids = document.querySelectorAll('.video-thumbnail,.icon-video-play-button');
if (allVids.length > 0) {
  for (var i = 0; i < allVids.length; i++) {
    allVids[i].addEventListener('click', vidSwitch, false);
  }
}

function vidSwitch(evt) {
  var vidItem = evt.target;
  var vidParent = vidItem.parentNode;
  var clickedClass = vidItem.className;
  console.log(clickedClass);
  var iframe = document.createElement('iframe');
  //assign theService to the provider added, but set to lower case to control for youtube, YouTube, etc.
  var theService = vidItem.parentNode.dataset.streaming.toLowerCase();
  var theVideoId = vidItem.parentNode.dataset.videoid.toLowerCase();
  if (theService == "youtube") {
    iframe.setAttribute('src', '//www.youtube.com/embed/' + theVideoId + '?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=0&rel=0&vq=hd1080');
  } else if (theService == "vimeo") {
    iframe.setAttribute('src', '//player.vimeo.com/video/' + theVideoId + '?autoplay=1&title=0&byline=0&portrait=0');
  } else {
    console.log("If you are getting this error in the console, it is probably a sign that the youtube or vimeo api has changed.");
  }
  //The parameters for the video embed are set to show video controls but disallow related information at the video's end.
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('class', 'video-iframe');
  if (clickedClass === "video-thumbnail" || clickedClass === "icon-video-play-button") {
    vidParent.querySelector('.icon-video-play-button').remove();
    vidParent.querySelector('.video-thumbnail').remove();
    vidParent.appendChild(iframe);
  }
}

// var vimObject = {};
// var getVimeoThumbnail = function(id, vidDiv) {
//   var imgUrl = "";
//   $.ajax({
//     type: 'GET',
//     url: '//vimeo.com/api/v2/video/' + id + '.json',
//     jsonp: 'callback',
//     dataType: 'jsonp',
//     success: function(data) {
//       imgUrl = data[0].thumbnail_large;
//       vidDiv.style.backgroundImage = "url(" + imgUrl + ")";
//     }
//   });
// };

// var allThumbs = document.querySelectorAll('.video-thumbnail');
// if (allThumbs.length > 0) {
//   for (var i = 0; i < allThumbs.length; i++) {
//     if (allThumbs[i].dataset.isVimeo === "true") {
//       var vidId = allThumbs[i].dataset.videoid;
//       getVimeoThumbnail(vidId, allThumbs[i]);
//     }
//   }
// }





// $('.video-thumbnail,.icon-video-play-button').click(function() {
//   var clickedClass = $(this).attr('class');
//   console.log(clickedClass);
//   var iframe = document.createElement('iframe');
//   //assign theService to the provider added, but set to lower case to control for youtube, YouTube, etc.
//   var theService = $(this).parent().attr('data-streaming').toLowerCase();
//   var theVideoId = $(this).parent().attr('data-videoid');
//   if (theService == "youtube") {
//     iframe.setAttribute('src', '//www.youtube.com/embed/' + theVideoId + '?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=0&rel=0&vq=hd1080');
//   } else if (theService == "vimeo") {
//     iframe.setAttribute('src', '//player.vimeo.com/video/' + theVideoId + '?autoplay=1&title=0&byline=0&portrait=0');
//   } else {
//     console.log("If you are getting this error in the console, it is probably a sign that the youtube or vimeo api has changed.");
//   }
//   //The parameters for the video embed are set to show video controls but disallow related information at the video's end.
//   iframe.setAttribute('frameborder', '0');
//   iframe.setAttribute('class', 'video-iframe');
//   if (clickedClass === "icon-video-play-button") {
//     $(this).parent().empty().append(iframe);
//   } else {
//     $(this).prev().remove();
//     $(this).replaceWith(iframe);
//   }
// });

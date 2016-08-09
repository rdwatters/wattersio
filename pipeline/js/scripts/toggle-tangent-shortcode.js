(function() {
  var $btn = $('.inline-aside-button'),
      $content = $btn.next('.inline-aside-content');

  $btn.on('click', function() {
    var isOpen = $content.is(':visible'),
        slideDir = isOpen ? 'slideUp' : 'slideDown',
        dur = isOpen ? 200 : 400;
    $content.velocity(slideDir, {
      easing: 'easeOutQuart',
      duration: dur
    });
  });
})();
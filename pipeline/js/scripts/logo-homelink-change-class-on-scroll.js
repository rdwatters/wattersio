//don't run scroll event on mobile devices

$(window).scroll(function() {
		var siteLogo = $('.site-logo.home-link:not(.form)');
    var scroll = $(window).scrollTop();
    var heroHeight = ($('header.hero').height() - 35);
    if (scroll > heroHeight) {
        siteLogo.addClass('lightbg');
    }else {
    	siteLogo.removeClass('lightbg');
    }
});

$(function() {

    /**
     * Store the transition end event names for convenience.
     */
    var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

    /**
     * Trigger the play button states upon clicking.
     */
    $('.song-button').click(function(e) {

        e.preventDefault();
        console.log($(this).parent().next());

        if ($(this).hasClass('stop')) {
            $(this).parent().next()[0].pause();
            $(this).removeClass('stop')
                .addClass('to-play');
        } else if (!$(this).hasClass('to-play')) {
            $(this).parent().next()[0].play();
            $(this).addClass('stop');
        }
    });

    /**
     * Remove the 'to-play' class upon transition end.
     */
    $(document).on(transitionEnd, '.to-play', function() {

        $(this).removeClass('to-play');

    });

});
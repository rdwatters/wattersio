$('.assumptions').click(function() {
    $(this).children('ul').slideToggle(200);
    [].forEach.call(document.querySelectorAll('.assumptions > header > h2 i.icon-next'), function(item) {
        item.classList.toggle('open-assumptions');
    });
});

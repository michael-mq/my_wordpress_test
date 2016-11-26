(function($) {

    var TIME_ON_SLIDE = 7500;
    var slideIdRegex = /slide-([0-9]*)/;
    var runningInterval = null;

    function autoSlide() {
        var $currentSlide = $('.controls .selected');
        var $nextSlide = $currentSlide.next().length > 0 ? $currentSlide.next() : $('.controls li:first-child');
        transitionTo($nextSlide);
    }

    function transitionTo($slide) {
        var slideIdClass = slideIdRegex.exec($slide.attr('class'))[0];
        showSlide(slideIdClass);
        updateControls(slideIdClass);
    }

    function showSlide(slideIdClass) {
        $('.selected.slide')
            .removeClass('selected')
            .fadeOut(function () {
                $('.slide.' + slideIdClass)
                    .fadeIn()
                    .addClass('selected');
                });
    }

    function updateControls(slideIdClass) {
        $('.controls .selected').removeClass('selected');
        $('.controls .' + slideIdClass).addClass('selected');
    }

    function turnOnAutoSlide() {
        turnOffAutoSlide();
        runningInterval = setInterval(autoSlide, TIME_ON_SLIDE);
    }

    function turnOffAutoSlide() {
        if (runningInterval) {
            clearInterval(runningInterval);
        }
    }

    $('.featured-panel').on('click', '.controls li:not(.selected)', function () {
        turnOffAutoSlide();
        transitionTo($(this));
        turnOnAutoSlide();
    });

    if ($('.featured-panel').length > 0) {
        turnOnAutoSlide();
    }

})(window.jQuery);

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-toggle',['jquery'], function ($) {
            return factory($);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.Toggle = factory(root.jQuery);
    }
}(this, function ($) {

    var Toggle = {};

    Toggle.bindEvents = function () {
        $('body').on('click', '.rui-toggle-link', function (e) {
            e.preventDefault();

            if ($(this).hasClass('rui-toggle-open')) {
                $('.rui-toggle-container').hide();
                $(this).removeClass('rui-toggle-open');
            }
            else {
                $('.rui-toggle-open').removeClass('rui-toggle-open');
                $('.rui-toggle-container').hide();
                $(this).addClass('rui-toggle-open');

                var containerStr = $(this).attr('data-container');

                if (containerStr) {
                    $('#' + containerStr).show();
                }
                else {
                    $(this).closest('.rui-toggle-wrapper').find('.rui-toggle-container').show();
                }
            }

        });

        $('body').on('click', function (e) {
            var $openToggle = $('.rui-toggle-open');

            if ($openToggle.length > 0 && !Toggle.clickedOnToggle(e.target)) {
                e.preventDefault();
                $openToggle.removeClass('rui-toggle-open');
                $('.rui-toggle-container').hide();
            }
        });

    };

    Toggle.clickedOnToggle = function (target) {
        return Toggle.clickedOnLink(target) || Toggle.clickedOnContainter(target);
    };

    Toggle.clickedOnLink = function (target) {
        return $(target).hasClass('rui-toggle-link') || $(target).closest('.rui-toggle-link').length > 0;
    };

    Toggle.clickedOnContainter = function (target) {
        return $(target).closest('.rui-toggle-container').length > 0;
    };

    $(document).ready(function () {
        Toggle.bindEvents();
    });
    return Toggle;

}));



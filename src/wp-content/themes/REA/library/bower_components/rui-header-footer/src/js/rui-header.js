(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-header', ['jquery', 'rui-browser-utils', 'rui-click-buster', 'rui-touch-button', 'rui-user-view','rui-side-panel'], function ($, BrowserUtils, ClickBuster, TouchButton, UserView, SidePanel) {
            return factory($, BrowserUtils, ClickBuster, TouchButton, UserView, SidePanel);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.Header = factory(root.jQuery, root.RUI.BrowserUtils, root.RUI.ClickBuster, root.RUI.TouchButton, root.RUI.UserView, root.RUI.SidePanel);
    }
}(this, function ($, BrowserUtils, ClickBuster, TouchButton, UserView, SidePanel) {


    var isPreviousRefererCurrentDomain = function(){
        return BrowserUtils.getReferrer().indexOf('realestate.com.au') != -1;
    };
    var mobileHeaderCTATemplate =  function(opt){
        return (
        '<button class="rui-mobile-cta rui-icon rui-icon-'+ opt.icon +' rui-button-no-style">' +
            '<span class="rui-visuallyhidden">' + opt.text + '</span>' +
            '<span class="hit-box"></span>' +
        '</button>'
        );
    };

    var Body = $('body'),
    //This function is to see calculate what coefficient the user has zoomed the page on a touch device
        detectZoom = function () {
            //IE 8 has no innerwidth
            if ("innerWidth" in window) {
                return document.documentElement.clientWidth / window.innerWidth;
            } else {
                return 1;
            }
        },
        BurgerMenu = {
            'TOGGLE_CLASS': 'rui-burger-toggle',
            'MENU_CONTAINER_CLASS': 'rui-burger-container',
            'OPEN_CLASS': 'rui-burger-open',
            'FEATURE_ENABLED_CLASS': 'rui-burger',
            'init': function () {
                $('html').addClass(BurgerMenu.FEATURE_ENABLED_CLASS);
                $('.rui-burger-toggle').addClass('rui-desktop');
                this.setUpConstants();

                if (this.HAS_MOBILE_NAV) {
                    $('.rui-burger-toggle').clone().prependTo($(".rui-header-container")).removeClass('rui-desktop').addClass('rui-mobile');
                }else{
                    $('.rui-mobile-nav').remove();
                }
                BurgerMenu.bindEvents();
            },
            'setUpConstants':function(){
                this.RETURN_TO_PREVIOUS_PAGE = Body.data('returnToPreviousPage') && isPreviousRefererCurrentDomain() && BrowserUtils.getHistoryLength() > 1;
                this.HAS_MOBILE_NAV = ($(".rui-mobile-nav").length > 0 && !this.RETURN_TO_PREVIOUS_PAGE) ? true : false;
            },
            'open': function (event) {
                $('html').addClass(BurgerMenu.OPEN_CLASS);
                if(BurgerMenu.sidePanel){
                    BurgerMenu.sidePanel.open();
                }
            },
            'close': function (event) {
                if(BurgerMenu.sidePanel){
                    BurgerMenu.sidePanel.close();
                }else{
                    BurgerMenu.onClose();
                }
            },
            'onClose': function(){
                $('html').removeClass(BurgerMenu.OPEN_CLASS);
                $(document).trigger('rui-burger-toggle-off');
            },
            'desktopBurgerLogic': function (e) {
                if ($('.' + BurgerMenu.TOGGLE_CLASS + '.rui-desktop').is(":visible")) {
                    var clickedInsideMenu = ($(e.target).closest('.rui-burger-container').length > 0 && $(e.target).closest('.rui-nav-item').length === 0) ? true : false,
                        clickedTheBurger = ($(e.target).hasClass(BurgerMenu.TOGGLE_CLASS) || $(e.target).closest('.' + BurgerMenu.TOGGLE_CLASS).length > 0) ? true : false;
                    if (clickedTheBurger && !$('html').hasClass(BurgerMenu.OPEN_CLASS)) {
                        BurgerMenu.open(e);
                    } else if ($('html').hasClass(BurgerMenu.OPEN_CLASS) && !clickedInsideMenu) {
                        BurgerMenu.close(e);
                    }
                }
            },
            'goBackToPreviousPageLogic': function(){
                if(this.RETURN_TO_PREVIOUS_PAGE){
                    this.$goBackEl = $(mobileHeaderCTATemplate({
                        'icon':'back',
                        'text': 'Go Back'
                    }));
                    this.$goBackEl.prependTo($(".rui-header-container"));
                    this.$goBackEl.on('click',function(){
                        BrowserUtils.go(-1);
                    });
                }
            },
            'bindEvents': function () {
                var clickEvent = 'click';
                if ('ontouchstart' in window) {
                    clickEvent = 'touchend';
                    $('.' + BurgerMenu.TOGGLE_CLASS + '.rui-mobile').each(function (index, toggleElement) {
                        new TouchButton(toggleElement, BurgerMenu.open);
                    });
                    ClickBuster.init();
                } else {
                    $('.' + BurgerMenu.TOGGLE_CLASS + '.rui-mobile').click(BurgerMenu.open);
                }

                if (this.HAS_MOBILE_NAV) {
                    $('.rui-mobile-nav').show();
                    this.sidePanel = SidePanel.create('.rui-mobile-nav','left','.rui-burger-container');
                    this.sidePanel.getView().addClass('rui-header-mobile-only');
                    $(this.sidePanel).on('closed',BurgerMenu.onClose);
                }

                this.goBackToPreviousPageLogic();

                $(document).on('click', 'body', BurgerMenu.desktopBurgerLogic);
            }
        },
        Header = {
            'didScroll': false,
            'changeHeaderOn': 1,
            'timeBetweenScrolls': 1,
            'isResponsive': Body.hasClass('rui-responsive'),
            'maxHeaderWidthWhenNotResponsive': 975,
            'animationDuriation': 300,
            'isInputInFocus': false,
            'userView' : UserView,
            'redirect': function(path){
                window.location = path;
            },
            'scrollTo': function(el, offset) {
                var that = this;
                // offset can be used to adjust the position of the scrollTo element
                offset = offset || 0;

                Header.shrinkHeader(function() {
                    var heightOfHeader = 0;
                    that.header.hide().show(0);
                    pos = $(el).offset().top;
                    if(that.header.css("position") === "fixed"){
                        heightOfHeader = that.header.outerHeight();
                    }
                    $('html, body').animate({
                        scrollTop: pos - heightOfHeader - offset
                    }, 300);
                });
            },
            //Improve performance of onscroll
            'deBounce': function (delay, callback, accumulateData) {
                var timeout = null;
                var theData = [];
                return function () {
                    //
                    // accumulate arguments in case caller is interested
                    // in that data
                    //
                    if (accumulateData) {
                        var arr = [];
                        for (var i = 0; i < arguments.length; ++i) {
                            arr.push(arguments[i]);
                        }
                        theData.push(arr);
                    }

                    //
                    // if a timeout has been registered before then
                    // cancel it so that we can setup a fresh timeout
                    //
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    var args = arguments;
                    timeout = setTimeout(function () {
                        callback.apply((accumulateData) ? { data: theData } : null, args);
                        theData = []; // clear the data array
                        timeout = null;
                    }, delay);
                };
            },
            'init': function () {
                this.header = $(".rui-header");
                //Remove class that prevents css animations (so we don't get any funky animations on dom loading)
                Body.removeClass('rui-preload');
                //If the site is cobranded unfix the header and exit
                BurgerMenu.init();

                var $myReaNav = this.header.find('.rui-myrea-nav');
                if($myReaNav.length==1){
                    this.userView.init($myReaNav, Body.hasClass('rui-responsive'));
                }
                if (Body.hasClass('rui-cobranded') || this.header.hasClass('rui-header-not-fixed')) {
                    return;
                }
                //Bind the events on header
                this.bindEvents();
            },
            'bindEvents': function () {
                var that = this;
                //Fixed position headers on touch enabled devices handles poorly we want to unfix the header in these situations when a user brings up there keyboard on a input
                if ('ontouchstart' in window) {
                    $(document).on('focus', 'input,textarea,select', function (e) {
                        that.isInputInFocus = true;
                        that.header.addClass('rui-header-not-fixed');
                        that.header.removeClass('rui-header-shrink');
                    });
                    $(document).on('blur', 'input,textarea,select', function (e) {
                        //Check where the user has scrolled to and reapply the previous state of the header
                        that.isInputInFocus = false;
                        if (window.pageYOffset > that.changeHeaderOn) {
                            Body.addClass('rui-preload');
                            that.header.addClass('rui-header-shrink');
                        }
                        that.header.removeClass('rui-header-not-fixed');
                    });
                }
                Body.on('click','[data-rui-scroll-to-el]',function(){
                    var $link = $(this);
                    var scrollToEl = $link.data('rui-scroll-to-el');
                    var scrollOffset = $link.data('rui-scroll-offset') || 0;
                    Header.scrollTo(scrollToEl, scrollOffset);
                });
                //If the header is initialized with the header-shrink class keep it collapsed
                if (!this.header.hasClass('rui-header-shrink')) {
                    $(window).on('scroll', that.deBounce(that.timeBetweenScrolls, function (event) {
                        that.scrollPage();
                    }, true));
                    $(window).on('resize', function (e) {
                        that.scrollPage();
                    });
                    $(document).on("rui-burger-toggle-off", function () {
                        window.setTimeout(function () {
                            Header.scrollPage();
                        }, 700);
                    });
                    this.scrollPage();
                }
            },
            'scrollY': function () {
                return window.pageYOffset || document.documentElement.scrollTop;
            },
            'shrinkHeader': function(callback){
                var $html = $('html'),
                    waitForAnimation = (this.header.hasClass('rui-header-shrink') || $html.hasClass('ie8') || $html.hasClass('ie9'));
                if(waitForAnimation){
                    if(typeof callback === 'function'){
                        callback.call(this);
                    }
                }else{
                    this.header.addClass('rui-header-shrink');
                    window.setTimeout(function(){
                        if(typeof callback === 'function'){
                            callback.call(this);
                        }
                    },this.animationDuriation);
                }
            },
            'scrollPage': function () {
                if (!this.isInputInFocus) {
                    Body.removeClass('rui-preload');
                    //If the width of device doesn't fit the headers width and we aren't rendering the page responsively don't
                    if (($(window).width() < this.maxHeaderWidthWhenNotResponsive * detectZoom() && !this.isResponsive)) {
                        this.header.addClass('rui-header-not-fixed');
                        this.header.removeClass('rui-header-shrink');
                        // Dont fix the header if the user has zoomed in on the page and the layout is responsive
                    } else if (detectZoom() > 1 && this.isResponsive) {
                        this.header.addClass('rui-header-not-fixed');
                        // Shrink the header
                    } else {
                        this.header.removeClass('rui-header-not-fixed');
                        var sy = this.scrollY();
                        if (sy >= this.changeHeaderOn) {
                            //This is to remove the international menu when the user scrolls
                            $(this.header).find('.rui-toggle-link.rui-site-link').removeClass('rui-toggle-open');
                            $(this.header).find('.rui-international-nav.rui-toggle-container').hide();
                            this.header.addClass('rui-header-shrink');
                        }
                        else {
                            if (!$('html').hasClass('rui-burger-open')) {
                                this.header.removeClass('rui-header-shrink');
                            }
                        }
                    }
                }
            }
        };
    Header.init();
    return Header;
}));

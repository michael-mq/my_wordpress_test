/* RUI: REA User Interface library - Header Footer - v1.4.7
   Copyright 2016, REA Group */

/**
 * This code has been adapted from Google's solution for capturing
 * extra clicks that occur when dealing with browsers on touch
 * devices: https://developers.google.com/mobile/articles/fast_buttons
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-click-buster',[], function () {
            return factory();
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.ClickBuster = factory();
    }
}(this, function () {

    var ClickBuster = {
        'coordinates': [],

        'preventGhostClick': function (x, y) {
            ClickBuster.coordinates.push(x, y);
            window.setTimeout(ClickBuster.pop, 2500);
        },

        'pop': function () {
            ClickBuster.coordinates.splice(0, 2);
        },

        'onClick': function (event) {
            for (var i = 0; i < ClickBuster.coordinates.length; i += 2) {
                var x = ClickBuster.coordinates[i];
                var y = ClickBuster.coordinates[i + 1];
                if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }
        },

        'init': function () {
            document.addEventListener('click', ClickBuster.onClick, true);
        }
    };

    return ClickBuster;
}));


/**
 * This code has been adapted from Google's solution for creating
 * fast responding buttons when dealing with browsers on touch devices:
 * https://developers.google.com/mobile/articles/fast_buttons
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-touch-button',['rui-click-buster'], function (ClickBuster) {
            return factory(ClickBuster);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.TouchButton = factory(root.RUI.ClickBuster);
    }
}(this, function (ClickBuster) {

    var TouchButton = function (element, handler) {
        this.element = element;
        this.handler = handler;

        element.addEventListener('touchstart', this, false);
        element.addEventListener('click', this, false);
    };

    TouchButton.prototype = {
        'handleEvent': function (event) {
            switch (event.type) {
                case 'touchstart':
                    this.onTouchStart(event);
                    break;
                case 'touchmove':
                    this.onTouchMove(event);
                    break;
                case 'touchend':
                    this.onClick(event);
                    break;
                case 'click':
                    this.onClick(event);
                    break;
            }
        },

        'onTouchStart': function (event) {
            event.stopPropagation();

            this.element.addEventListener('touchend', this, false);
            document.body.addEventListener('touchmove', this, false);

            this.startX = event.touches[0].clientX;
            this.startY = event.touches[0].clientY;
        },

        'onTouchMove': function (event) {
            if (Math.abs(event.touches[0].clientX - this.startX) > 10 ||
                Math.abs(event.touches[0].clientY - this.startY) > 10) {
                this.reset();
            }
        },

        'onClick': function (event) {
            event.stopPropagation();
            this.reset();
            this.handler(event);

            if (event.type === 'touchend') {
                ClickBuster.preventGhostClick(this.startX, this.startY);
            }
        },

        'reset': function () {
            this.element.removeEventListener('touchend', this, false);
            document.body.removeEventListener('touchmove', this, false);
        }
    };

    return TouchButton;

}));


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-side-panel', ['jquery'], function ($) {
            return factory($);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.SidePanel = factory(root.jQuery);
    }
}(this, function ($) {
    var SidePanel = function(){};

    SidePanel.prototype.init = function(contentEl, direction, containerEl){
        this._$containerEl = $(containerEl || 'body');
        this._$el = $('<div class="rui-side-panel">' +
                        '<div class="rui-side-panel__overlay"></div>' +
                        '<div class="rui-side-panel__cont">' +
                            '<div class="rui-side-panel__content"></div>' +
                            '<div class="rui-side-panel__close rui-icon rui-icon-cross" aria-role="button" aria-label="Close"></div>' +
                        '</div>' +
                    '</div>');
        this._$el.find('.rui-side-panel__content').append($(contentEl));
        var clickEvent =  ('ontouchstart' in window) ? 'touchend' : 'click';
        this._$el.on(clickEvent,'.rui-side-panel__overlay,.rui-side-panel__close',$.proxy(this.close,this));

        if(direction=='right'){
            this._$el.addClass('is-right');
        }
        this._$containerEl.append(this._$el.hide());
    };

    SidePanel.prototype.open = function(){
        this._$el.show().offset(); //grab offsetHeight to force reflow before animation.
        this._$el.addClass('is-open');
        $(this).trigger('opened');
    };

    SidePanel.prototype.close = function(){
        var $content = this._$el.find('.rui-side-panel__cont');
        $content.one("transitionend", $.proxy(this._closeComplete, this));
        this._$el.removeClass('is-open');
        $(this).trigger('closed');
    };

    SidePanel.prototype._closeComplete = function(){
        this._$el.hide();
    };

    SidePanel.prototype.destroy = function(){
        if(this._$el){
            this._$el.remove();
        }
    };

    SidePanel.prototype.getView = function(){
        return this._$el;
    };

    SidePanel.create = function(){
        var panel = new SidePanel();
        panel.init.apply(panel,arguments);
        return panel;
    };
    
    return SidePanel;
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-user-view', ['jquery', 'rui-side-panel', 'rui-touch-button'], function ($, SidePanel) {
            return factory($, SidePanel);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.UserView = factory(root.jQuery, root.RUI.SidePanel);
    }
}(this, function ($, SidePanel) {
    var savedPropertiesUrl = function() {
        if ( "matchMedia" in window && window.matchMedia("(max-width: 580px)").matches ) {
            return "https://m.realestate.com.au/my-real-estate/saved-properties";
        } else {
            return "https://www.realestate.com.au/saved-properties/";
        }
    };

    var TABLET_PORTRAIT_AND_SMALLER = "(max-width: 800px)"; // should match CSS $tabletPortrait
    var UserView = {
        'setupViews': function(navContainer){
            this.views = {
                navContainer : navContainer,
                personGuyIcon: navContainer.find('.rui-person-guy'),
                personGuyMenu: navContainer.find('.rui-person-guy-menu'),
                desktopMenuContainer: navContainer.find('.rui-account-menu-container')
            };

        },
        '_userMenuMarkup': function() {

            var links = [
                {
                    href: savedPropertiesUrl(),
                    title: "View saved properties",
                    icon: "rui-icon-save-hollow-small",
                    text: "Saved properties"
                },
                {
                    href: "https://www.realestate.com.au/property/my-property",
                    title: "My property",
                    icon: "rui-icon-home-small",
                    text: "My property"
                },
                {
                    href: "https://www.realestate.com.au/saved-searches/",
                    title: "View property alerts",
                    icon: "rui-icon-save-search-small",
                    text: "Saved searches &amp; alerts"
                },
                {
                    href: "https://www.realestate.com.au/my-real-estate/my-profile/",
                    title: "View profile",
                    icon: "rui-icon-avatar-small",
                    text: "My profile"
                },
                {
                    href: "https://www.realestate.com.au/my-real-estate/account/",
                    title: "Manage account settings",
                    icon: "rui-icon-cog-small",
                    text: "Account settings"
                }
            ];

            var template = '<ul class="rui-account-menu">' +
                                '{{linksTemplate}}' +
                                '<li class="rui-account-menu-item last">{{userView}}</li>' +
                            '</ul>';
            return template.replace(/{{linksTemplate}}/g, this._linksMarkup(links))
                        .replace(/{{userView}}/g, this._userViewMarkup());
        },
        '_linksMarkup': function(links){
            var template = '<li class="{{className}}">' +
                    '<a href="{{href}}" title="{{title}}">' +
                        '{{iconTemplate}}' +
                        '<span>{{text}}</span>' +
                    '</a>' +
                '</li>',
                markup = '',
                _iconMarkup = this._iconMarkup;

            $.each(links, function(index, item) {
                var liClass = "rui-account-menu-item";
                if ( index === 0 ) {
                    liClass += " first";
                }
                markup += template.replace(/{{className}}/g, liClass)
                    .replace(/{{href}}/g, item.href)
                    .replace(/{{title}}/g, item.title)
                    .replace(/{{text}}/g, item.text)
                    .replace(/{{iconTemplate}}/g, _iconMarkup(item.icon));
            });
            return markup;
        },
        '_iconMarkup': function(icon) {
            var template = '<span class="rui-icon {{icon}}"></span>';
            return icon ? template.replace(/{{icon}}/g, icon) : '';
        },
        '_userViewMarkup': function() {
            var loggedInView = '<span class="rui-user-email">' + this.userEmail + '</span>' +
                '<div><a class="rui-button-basic rui-button-mobile-smaller" href="https://www.realestate.com.au/logout.ds">Log out</a></div>';
            var loggedOutView = '<div><a class="rui-button-basic rui-button-mobile-smaller" href="https://www.realestate.com.au/my-real-estate/login">Sign in</a>' +
                '<a class="rui-button-brand rui-button-mobile-smaller" href="https://www.realestate.com.au/my-real-estate/register">Join</a></div>';
            return this.isLoggedIn ? loggedInView : loggedOutView;
        },
        '_onLoggedIn': function(event, user){
            var views = this.views;
            this.isLoggedIn = true;
            views.navContainer.show().addClass('is-logged-in');
            views.personGuyIcon.addClass('rui-icon-user-on').removeClass('rui-icon-user-off');
            this.updateUserArea( user.email );
        },
        '_onLoggedOut' : function(){
            var views = this.views;
            this.isLoggedIn = false;
            views.navContainer.show().removeClass('is-logged-in');
            views.personGuyIcon.addClass('rui-icon-user-off').removeClass('rui-icon-user-on');
            this.updateUserArea();
        },
        '_createDesktopUserMenu': function() {
            this.views.desktopUserMenu = this.views.desktopMenuContainer.html($(this._userMenuMarkup()).addClass("rui-toggle-container"));
        },
        '_userMenuClickHandler': function(e){
            e.preventDefault();
            if (this.isResponsive && "matchMedia" in window && window.matchMedia(TABLET_PORTRAIT_AND_SMALLER).matches) {
                e.stopImmediatePropagation();   //Don't allow rui-toggle handler to fire.
                this.sidePanel = this.sidePanel || SidePanel.create(this._userMenuMarkup(), "right");
                this.sidePanel.getView().addClass('rui-header-mobile-only').toggleClass('disable-nav', !this.isLoggedIn);
                this.sidePanel.open();
            } else if ( !this.views.desktopUserMenu ){
                this._createDesktopUserMenu();
            }
        },
        'updateUserArea': function( userEmail ) {
            this.userEmail = userEmail || "";
            if ( this.sidePanel ) {
                this.sidePanel.getView().toggleClass("disable-nav", !this.isLoggedIn);
            }
            $('.rui-account-menu .last').html(this._userViewMarkup());
        },
        'bindEvents': function(){
            // listen to events dispatched by rui-user
            $(document).on('rui-logged-in',$.proxy(this._onLoggedIn,this))
                .on('rui-logged-out',$.proxy(this._onLoggedOut,this));

            var clickEvent = ('ontouchstart' in window) ? 'touchend' : 'click';
            this.views.personGuyIcon.on(clickEvent,$.proxy(this._userMenuClickHandler, this));

        },
        'init': function(navContainer, isResponsive){
            this.isResponsive = isResponsive;
            this.userEmail = "";
            this.isLoggedIn = false;
            this.setupViews(navContainer);
            this.bindEvents();
        }
    };
    return UserView;
}));

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

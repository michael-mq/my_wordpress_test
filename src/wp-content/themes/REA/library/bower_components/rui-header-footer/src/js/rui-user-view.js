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

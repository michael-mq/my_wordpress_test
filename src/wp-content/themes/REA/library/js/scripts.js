/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

// IE8 ployfill for GetComputed Style (for Responsive Script below)
import "imagesloaded";

/*eslint-disable*/
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

var postListModule = {
    init : function(){
        //If no element, return
        var $el = jQuery('.discover-widget.list-module');
        if($el.length == 0){
            return;
        }
        postListModule.event($el);
    },
    event : function($el){
        $el.on('click', '.show-more-list', function(e){
            e.preventDefault();
            postListModule.toggle($el, e.target);
        })
    },
    toggle : function($el, target){

        var $toggleEl = $el.find('div');
        var $target = jQuery(target);

        if($toggleEl.hasClass('hide')){
            $toggleEl.removeClass('hide');
            $target.html('<i>- </i>Show less Tags');
        }else{
            $toggleEl.addClass('hide');
            $target.html('<i>+ </i>Show more Tags');
        }

    }

}

var tabModule = {

    init : function(){
        //If no element, return
        var $el = jQuery('.discover-widget.tab-module');
        if($el.length == 0){
            return;
        }

        // Hide Recent by default
        $el.find('ul.recent').addClass('hide');

        //Set height on init and call events
        tabModule.event($el);
        $el.imagesLoaded( function() {
            tabModule.height($el);
        });

    },

    event : function($el){
        $el.on('click', '.buttons a', function(e){
            e.preventDefault();
            tabModule.switcher($el, e.target);
        })
    },

    switcher : function($el, target){
        var $target = jQuery(target);
        var id = $target.attr('id');

        if($target.hasClass('.selected')){
            return;
        }else{
            // Update Buttons
            $el.find('.buttons a').removeClass('selected');
            $target.addClass('selected');

            //Update Post Lists
            var $lists = $el.find('ul.popular, ul.recent');
            $lists.removeClass('hide');

            $lists.each(function(index, val){
                if(jQuery(val).hasClass(id)){

                }else{
                    jQuery(val).addClass('hide');
                }
            });

            // Set Height on panel change
            tabModule.height($el);

        }
    },

    height : function($el){

        var $tabs = $el.find('.tabs');
        var selectHeight = $el.find('ul.popular, ul.recent').not('.hide').outerHeight();

        selectHeight += 55;

        $tabs.css('height', selectHeight);

    }

};

var toTop = {

    init : function(){

        var $toTop = jQuery('.to-top'),
            $toTopContainer = jQuery('.to-top-widget'),
            $footer = jQuery('.blog-footer'),
            $fixedEl = jQuery('.fixedEl'),
            $mobileEl = jQuery('.to-top.mobile'),
            breakpoint = {};

        breakpoint.status = toTop.resize();

        jQuery(window).resize(function(){

	    	breakpoint.status = toTop.resize();

	        toTop.scrollEvent($toTop, $toTopContainer, $footer, $fixedEl, $mobileEl, breakpoint);

        });

        jQuery(window).scroll(function(){

            toTop.scrollEvent($toTop, $toTopContainer, $footer, $fixedEl, $mobileEl, breakpoint);

        });

        $toTop.on('click', function(){

            jQuery("html, body").animate({ scrollTop: 126 }, 600);

            return false;

        })


    },

    resize : function(){

	    var windowWidth = jQuery(window).width();

	    if(windowWidth < 720){

		    return false;

	    }


	    return true;

    },

    scrollEvent : function($toTop, $toTopContainer, $footer, $fixedEl, $mobileEl, breakpoint){

        var elementOffset = $fixedEl.offset().top,
            containerOffset = $toTopContainer.offset().top,
            footerOffset = $footer.offset().top;

        if( elementOffset > containerOffset ){

            $toTop.css('background', '#e4002b');

            if(!$toTop.hasClass('show')){

                $toTop.addClass('show');

            }

        }else{

            if($toTop.hasClass('show')){

                $toTop.removeClass('show');

            }

        }

        if(breakpoint.status == false){

	        $toTop.removeClass('show');
	        $mobileEl.addClass('show');

        }else{

	        if($mobileEl.hasClass('show')){

		        $mobileEl.removeClass('show');

	        }

        }


    }

};


var contributorPage = {

    init: function(){

        var $contributors = jQuery('.contributors-page');
        var _this = this;

        if($contributors.length > 0){

            _this.events();
            _this.disableEmpty();

            jQuery('li a:contains("Profile")').text('View All');

            if( window.location.search == '' || window.location.search == 'all' ){

                jQuery('.alphabet li:first-child').addClass('selected');

            }else{

                letter = window.location.search.substring(1);

                jQuery('.alphabet li').each(function(r, t){

                    var $t = jQuery(t);

                    if( $t.text() == letter ){

                        $t.addClass('selected');

                    }

                });

            }

            // Run the router after we've selected an el
            _this.router();

        }

    },

    router: function(){

        var _this = this;
        var selected = jQuery(document).find('.alphabet li.selected').text();

        history.pushState(selected, null, '?' + selected);

        if(history.state == 'all'){

            // all
            _this.showAll();

        }else{

            _this.showSome(history.state);

        }

    },

    events: function(){

        var _this = this;

        jQuery('.alphabet li a').on('click', function(e){

            e.preventDefault();

            var $target = jQuery(e.target);

            // only do this if the target parent has results
            if($target.parent().hasClass('enabled')){

                jQuery('.alphabet li').removeClass('selected');
                $target.parent().addClass('selected');

                _this.router();

            }

        });

    },

    showAll: function(){

        jQuery('.author-posts').addClass('show-author');
        jQuery('.author-posts').removeClass('gone');

    },

    showSome: function( letter ){

        var $authors = jQuery('.author-posts');

        $authors.each(function(i, v){

            var $v = jQuery(v);
            var authorLetter = $v.find('.author-name').text().substr(0,1).toLowerCase();

            if(authorLetter == letter){

                $v.removeClass('gone');
                $v.addClass('show-author');

            }else{

                $v.removeClass('show-author');
                $v.addClass('gone');

            }

            if($authors.length == (i+1)){

                if(jQuery('.show-author').length == 0){

                    jQuery('.contributor-list').append('<div class="no-authors">No authors found</div>');

                }else{

                    jQuery('.no-authors').remove();

                };

            }

        });

    },

    disableEmpty: function(){

        var $authors = jQuery('.author-posts');

        // Run through the letters and disable the empty ones
        $authors.each(function(i, v){

            var $v = jQuery(v);
            var authorLetter = $v.find('.author-name').text().substr(0,1).toLowerCase();

            jQuery('.alphabet li').each(function(r, e){

                if( authorLetter == jQuery(e).text() ){

                    jQuery(e).addClass('enabled');

                }

            });

        });

    }

};

// as the page loads, call these scripts
jQuery(document).ready(function($){

    //linkedInShare.init();

    tabModule.init();

    postListModule.init();

    // To Top button is not fixing correctly to base. More tests required.
    toTop.init();

    contributorPage.init();

    // add all your scripts here

    if ($('.single-post').length > 0) {
        var $scrollyPanel = $('.scrollable'),
            scrollLimits = null,
            tabletPortraitBreakpoint = 768; // Refer to scss/rui-sass-common.scss:40


        function calculateScrollLimits ($scrollyPanel) {
            var $parentContainer = $scrollyPanel.parent();

            if ($('.sharing-video').length > 0) {

                return {
                    'topScrollPos': $parentContainer.offset().top + 290, //Added padding
                    'bottomScrollPos': $parentContainer.offset().top + $parentContainer.outerHeight() - $scrollyPanel.outerHeight() - 0 //Added padding
                };

            }else {

                return {
                    'topScrollPos': $parentContainer.offset().top - 87, //Added padding
                    'bottomScrollPos': $parentContainer.offset().top + $parentContainer.outerHeight() - $scrollyPanel.outerHeight() - 95 //Added padding
                };

            }
        }

        function isTabletOrMobile(clientWidth) {
          return (clientWidth <= tabletPortraitBreakpoint);
        }

        $(window).on('resize', function () {
            scrollLimits = calculateScrollLimits($scrollyPanel);
        });


        $(window).on('scroll', function(val) {

            // Do not proceed if it's a tablet or mobile device
            if (isTabletOrMobile($(window).width())) {
              return;
            }

            var scrolledTo = $(window).scrollTop();
            scrollLimits = scrollLimits || calculateScrollLimits($scrollyPanel);

            if (scrolledTo > scrollLimits.topScrollPos && scrolledTo < scrollLimits.bottomScrollPos) {
                $scrollyPanel.addClass('fixed');
                $scrollyPanel.removeClass('base');
            } else if (scrolledTo > scrollLimits.bottomScrollPos) {
                $scrollyPanel.removeClass('fixed');
                $scrollyPanel.addClass('base');
            } else {
                $scrollyPanel.removeClass('fixed');
                $scrollyPanel.removeClass('base');
            }
        });
    }

    $(".posts-nav-link li").hover(function() {
        $(this).addClass("open");
        $(this).siblings().addClass("closed");
    }, function() {
        $(this).removeClass("open");
        $(this).siblings().removeClass("closed");
    });

}); /* end of as page load scripts */

/*eslint-enable*/

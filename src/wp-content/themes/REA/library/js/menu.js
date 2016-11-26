(function($) {

    var isTouch = $("html.touch").length > 0;

    var menuManipulator = {
        convertWordPressMenu: function () {
            // Manipulate the existing WP menu into a format that can be styled the way we want.
            $(".menu > .menu-parent-item").each(function () {
                var $topLevelMenuItem = $(this),
                    $originalSubMenu = $topLevelMenuItem.children(".sub-menu");

                $originalSubMenu.detach();

                var $subMenuWrapper = $("<div class=\"sub-menu-wrapper\"></div>");
                var $subMenuContainer = $("<div class=\"sub-menu-container rui-grid\"></div>");
                $subMenuContainer.append(menuManipulator.createSubMenuHeading($topLevelMenuItem));
                $subMenuContainer.append(menuManipulator.createSubMenuListItems($originalSubMenu));
                $subMenuWrapper.append($subMenuContainer);
                $topLevelMenuItem.append($subMenuWrapper);
            });
        },

        createSubMenuHeading: function ($topLevelMenuItem) {
            var $topLevelMenuItemLink = $topLevelMenuItem.children("a");
            return "<h4 class=\"rui-brand-heading\"><a href=\"" +
                $topLevelMenuItemLink.attr("href") + "\"><span class=\"fluff\">All '</span>" +
                $topLevelMenuItemLink.text() + "<span class=\"fluff\">' posts</span></a></h4>";
        },

        createSubMenuListItems: function ($originalSubMenu) {
            var $tmpContainer = $("<div/>");
            var $listContainer = $("<ul class=\"col\"></ul>");
            var totalItems = $originalSubMenu.children("li").length;
            $originalSubMenu.children("li").each(function (index, listItem) {
                var $listItem = $(listItem);
                $listContainer.append($listItem);

                if ((index + 1) % 4 === 0 || index === totalItems - 1) {
                    $tmpContainer.append($listContainer);
                    $listContainer = $("<ul class=\"col\"></ul>");
                }
            });
            return $tmpContainer.html();
        }
    };

    var desktopMenu = {

        isOpen: false,

        openSubMenu: function ($openedMenuListItem) {
           var $subMenuWrapper = $openedMenuListItem.children(".sub-menu-wrapper");
           if ($subMenuWrapper.length > 0) {
               $subMenuWrapper.closest("li").addClass("open");
               desktopMenu.isOpen = true;
           }
        },

        closeOpenedSubMenu: function ($openedMenuListItem) {
            var $openedMenu = $(".menu li.open");
            if (!$openedMenuListItem || ($openedMenuListItem.attr("id") != $openedMenu.attr("id"))) {
                $openedMenu.removeClass("open");
                desktopMenu.isOpen = false;
            }
        },

        bindEvents: function () {
            var openEvent = isTouch ? "touchstart" : "mouseover";
            // Open the sub menu container when mouse is over parent menu item
            $(document).on(openEvent, ".big-nav .menu > .menu-parent-item > a", function (e) {
                var $openedMenuListItem = $(this).parent();
                desktopMenu.closeOpenedSubMenu($openedMenuListItem);
                desktopMenu.openSubMenu($openedMenuListItem);
                if (isTouch) {
                    e.preventDefault();
                }
            });

            // Clicking elsewhere on the page hides the menu
            $(document).on("mouseleave", ".big-nav .category-panel", function () {
                desktopMenu.closeOpenedSubMenu();
            });

            $(document).on("click", ".big-nav", function (e) {
                var hasClickedOffMenu = $(e.target).closest(".menu").length === 0;
                if (hasClickedOffMenu && desktopMenu.isOpen) {
                    e.preventDefault();
                }
            });
        }
    };

    var burgerNav = {};

    burgerNav.isOpen = false;

    burgerNav.addOverlay = function () {
        $("body").append("<div class=\"burger-overlay\"></div>");
    };

    burgerNav.toggleExpand = function (event) {
        var $subMenu = $(event.target).next(".sub-menu-wrapper");
        $subMenu.toggleClass("open");
        event.preventDefault();
    };

    burgerNav.toggle = function (event) {
        var $target = $(event.target);
        var isClickOnHamburger = $target.closest(".toggle-menu").length > 0;
        if (isClickOnHamburger || $target.parent().hasClass(".toggle-menu")) {
            burgerNav.open(event);
        } else {
            var isClickOnMenu = $target.parents(".menu").length > 0;
            if (burgerNav.isOpen && !isClickOnMenu) {
                burgerNav.close(event);
            }
        }
    };

    burgerNav.open = function (event) {
        burgerNav.isOpen = true;
        $("html").addClass("nav-open");
        event.preventDefault();
    };

    burgerNav.close = function (event) {
       burgerNav.isOpen = false;
       $("html").removeClass("nav-open");
       event.preventDefault();
    };

    burgerNav.bindEvents = function () {
        var clickEvent = isTouch ? "touchstart click" : "click";
        $(document).on("click", ".mini-nav .menu > .menu-parent-item > a", burgerNav.toggleExpand);
        $(document).on(clickEvent, ".mini-nav", burgerNav.toggle);
    };

    function switchMenu() {
        var clientWidth = $(window).width();
        if (clientWidth > 719) {
            $("html").addClass("big-nav");
            $("html").removeClass("mini-nav");
        } else {
            $("html").addClass("mini-nav");
            $("html").removeClass("big-nav");
        }
    }

    $(window).on("resize", switchMenu);

    $(document).ready(function () {
        menuManipulator.convertWordPressMenu();
        desktopMenu.bindEvents();
        burgerNav.bindEvents();
        burgerNav.addOverlay();
    });
    switchMenu();

})(window.jQuery);

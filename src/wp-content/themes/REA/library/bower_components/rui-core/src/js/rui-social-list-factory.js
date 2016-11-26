(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-social-list-factory',['jquery','rui-social-list'], function ($, SocialList) {
            return factory($, SocialList);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.SocialListFactory = factory(root.jQuery, root.RUI.SocialList);
    }
}(this, function ($, SocialList) {
    var socialList,
        selector = ".rui-social-list";

    function socialListFactory()  {
        socialList = [];
        $(selector).each(function(){
            socialList.push(new SocialList($(this)));
        });
    }

    $(function() {
        if ($(this).data('auto-init') !== false) {
            socialListFactory();
        }
    });

    return socialListFactory;
}));


/* RUI: REA User Interface library - Core - v6.5.0
   Copyright 2016, REA Group */

/**
 * This module will create a User based off the sites lmdstok cookie, which is the token DS users to store the Users ID
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-cid', ['rui-localstorage'], function(LocalStorage) {
            return factory(LocalStorage);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.Cid = factory(root.RUI.LocalStorage);
    }
}(this, function(LocalStorage) {

    var cid = {

        getCid: function() {
            return LocalStorage.getItem('reacid');
        },
        setCid: function(cid) {
            LocalStorage.setItem('reacid', cid);
        }

    };

    return cid;

}));
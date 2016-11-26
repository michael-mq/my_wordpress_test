(function () {
    var config = {
        site: 'rea.msite',
        sz: [[300, 50],[320, 50]]
    };
    var params = {
        env: 'tst',
        type: 'buy',
        sect: 'homepage',
        sizes: config.sz
    };

    RUI.Advertorial.createAd(config, params, $('#rui-gpt-container')[0]);
}());

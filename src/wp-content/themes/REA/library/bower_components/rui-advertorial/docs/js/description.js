(function(){

  window.ruiAdProvider = "SAS";

  var container = document.querySelector('#native-ad-container');

  if (!container) {
    return;
  }

  RUI.Advertorial.createAd({
    config: {
      type: 'native',
      site: 'rea',
      sz: 'native, 300x50, 320x50, 320x100',
      "auto-remove": true
    },
    params: {
      state: "vic",
      sub: 'richmond',
      channel: 'buy',
      sect: "resultslist",
      pos: "advert1",
      platform: 'iphoneapp',
      pcode: '3121',
      proptype: 'land_development',
      env: 'tst'
    },
    container: container,
    nativeRenderCallback: function(json, renderTarget) {
      renderTarget.innerHTML = '<div style="padding: 10px; margin: 10px; border: 2px solid #bbb; background: #fff"><h2>' + json.adtitletext + '</h2><p>' + json.admessagetext + '</p></div>';
    }
  });

}());

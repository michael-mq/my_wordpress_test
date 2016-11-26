/*eslint-disable*/
import $ from "jquery";
import omnitureTrafficSource from "./omniture-traffic-source";

var omniture = function (omnitureDataModel, window) {
  "use strict";

  var omniture = {};
  omniture.s = function (e) {
    if (typeof window.s_gi === "undefined") {
      throw "Tried to load omniture library, but s_code has not been loaded yet";
    }
    var s = window.s_gi("rea-live");
    s.linkInternalFilters += ",localhost";
    return s;
  };

  omniture.trackPageLoad = function () {
    var omnitureProperties = getPageTrackingValues();
    if (omnitureProperties) {
      this.s().t(omnitureProperties);
    }
  };

  var defaultValues = function () {
    return {
      channel: "news",
      prop1: omniture.getTrafficSource(),
      prop24: "rea",
      prop26: "english"
    }
  };

  var getPageTrackingValues = function () {
    return $.extend({}, defaultValues(), omnitureDataModel);
  }

  omniture.getTrafficSource = function () {
    return omnitureTrafficSource.getProp1Value();
  };

  omniture.setTrafficSourceIntoCookie = function () {
    omnitureTrafficSource.setProp1CookieIfRequired();
  }

  omniture.roiEvent = function (values) {
    this.s().t($.extend({}, {
      channel: "news",
      prop24: "rea",
      prop26: "english"
    }, values));
  };

  omniture.initializeTracking = function () {
    $(function(){
      omniture.trackPageLoad();

      $("ul.social-links a").click(function() {
        omniture.roiEvent({
          events: "event76",
          prop36: "follow us - " + $(this).data("service").toLowerCase()
        });
      });

      $(".rui-social-link").click(function() {
        omniture.roiEvent({
          events: "event16",
          prop49: $(this).data("service").toLowerCase()
        });
      });
    });
  }

  return omniture;
};

export default omniture;

/*eslint-enable*/

/*eslint-disable*/

import BrowserUtils from "./browser-utils";
import jQuery from "jquery";

// jquery cookie is no longer supported, but this will do for now
(function ($, document, undefined) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, " "));
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (value === null) {
				options.expires = -1;
			}

			if (typeof options.expires === "number") {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				encodeURIComponent(key), "=", config.raw ? value : encodeURIComponent(value),
				options.expires ? "; expires=" + options.expires.toUTCString() : "", // use expires attribute, max-age is not supported by IE
				options.path    ? "; path=" + options.path : "",
				options.domain  ? "; domain=" + options.domain : "",
				options.secure  ? "; secure" : ""
			].join(""));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split("; ");
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split("=");
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join("="));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}

		return null;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};

})(jQuery, document);

let OmnitureTrafficSource = function ($) {
  "use strict";

  var session_cookie = "_stc";
  var rsf = "rsf";
  var referrer_lookup_table = {
    "google.": "SEO",
    "search.yahoo.": "SEO",
    "aol.": "SEO",
    "ask.com": "SEO",
    "bing.": "SEO",
    "live.com": "SEO",
    "t-online.": "SEO",
    "search.msn": "SEO",
    "excite.": "SEO",
    "sensis.com.au": "SEO",
    "athome.": "atHome Network",
    "atoffice.": "atHome Network",
    "athomelorraine.": "atHome Network",
    "athomealsace.": "atHome Network",
    "homesolution.": "atHome Network",
    "realestate.com.au": "REA Group Network",
    "realcommercial.com.au": "REA Group Network",
    "property.com.au": "REA Group Network",
    "realholidays.com.au": "REA Group Network",
    "propertyfinder.com": "REA Group Network",
    "hotproperty.co.uk": "REA Group Network",
    "homeguru.com.au": "REA Group Network",
    "ozhomevalue.com.au": "REA Group Network",
    "allrealestate.co.nz": "REA Group Network",
    "realcommercial.co.nz": "REA Group Network",
    "ukpropertyshop.co.uk": "REA Group Network",
    "casa.it": "REA Group Network",
    "squarefoot.com.hk": "REA Group Network",
    "allglobalproperties.com": "REA Group Network",
    "rea-group.com": "REA Group Network"
  };

  referrer_lookup_table.getReferrer = function (referrer) {
    if (referrer === "") {
      return "typedBookmarked";
    }
    for (var key in referrer_lookup_table) {
      if (referrer.indexOf(key) != -1) {
        return this[key];
      }
    }
    return "Other";
  };

  function getProp1Value() {
    var prop1 = getProp1FromCookie();
    if (prop1) {
      return prop1;
    }

    prop1 = getProp1FromQueryString(rsf);
    if (prop1 !== "") {
      return prop1;
    }

    return getProp1FromReferrer();
  }

  function getProp1FromCookie() {
    return $.cookie(session_cookie);
  }

  function setProp1CookieIfRequired() {
    if ($.cookie(session_cookie)) {
      return;
    }
    $.cookie(session_cookie, getProp1Value());
  }

  function getProp1FromQueryString(key) {
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(BrowserUtils.getHref());
    return qs !== null ? qs[1] : "";
  }

  function getProp1FromReferrer() {
    return referrer_lookup_table.getReferrer(parseReferrer());
  }

  function parseReferrer() {
    var regex = new RegExp("^https?://([^/]+)");
    var matches = regex.exec(BrowserUtils.getReferrer());
    return matches !== null ? matches[1] : "";
  }

  return {
    getProp1Value: getProp1Value,
    setProp1CookieIfRequired: setProp1CookieIfRequired,
    utils : BrowserUtils
  };
}(jQuery);


export default OmnitureTrafficSource;

/*eslint-enable*/

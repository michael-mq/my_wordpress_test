class CookieUtils {
  static grab(keys) {
    return document.cookie.split(";").map(function(kv) {
      var [key, value] = kv.split("=");
      return {
        key: key,
        value: value
      };
    }).filter(function(cookie) {
      if (keys.includes(cookie.key)) {
        return true
      }
      return false;
    }).reduce((map, obj) => {
      map[obj.key] = obj.value;
      return map;
    }, {});
  }
}

export default CookieUtils;

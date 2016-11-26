class BrowserUtils {
  static getHref() {
    return window.location.href;
  }
  static getReferrer() {
    return document.referrer;
  }
  static getPathName() {
    return window.location.pathname;
  }
}

export default BrowserUtils;

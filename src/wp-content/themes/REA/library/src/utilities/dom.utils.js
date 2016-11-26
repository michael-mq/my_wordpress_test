class DomUtils {
  constructor(window) {
    this.window = window;
  }

  getVisibilityValue(element) {
    if (element) {
      let computedStyle = this.window.getComputedStyle(element);
      return computedStyle.getPropertyValue("visibility");
    }
    return;
  }

  getDisplayValue(element) {
    if (element) {
      let computedStyle = this.window.getComputedStyle(element);
      return computedStyle.getPropertyValue("display");
    }
    return;
  }

}

export default DomUtils;

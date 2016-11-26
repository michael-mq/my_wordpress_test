import {AdvertorialModel} from "../models";

class AdvertorialFactory {
  constructor(primaryCategory, secondaryCategory) {
    this.primaryCategory = primaryCategory;
    this.secondaryCategory = secondaryCategory;
  }

  createModelFromElement(element, platform) {
    if (element) {
      return new AdvertorialModel({
        "type": element.dataset.type,
        "sz": element.dataset.sz,
        "site": element.dataset.site,
        "autoHide": element.dataset.autoHide,
        "platform": platform,
        "channel": element.dataset.channel,
        "sect": element.dataset.sect,
        "cat": this.primaryCategory,
        "subCategory": this.secondaryCategory,
        "brand": element.dataset.brand,
        "pos": element.dataset.pos,
        "postname": element.dataset.postname,
        "author": element.dataset.author
      });
    }
  }

}

export default AdvertorialFactory;

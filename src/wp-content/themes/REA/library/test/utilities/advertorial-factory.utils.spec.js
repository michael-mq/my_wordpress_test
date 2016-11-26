import {AdvertorialFactory}  from "../../src/utilities";

describe("AdvertorialFactory", () => {

  describe("given targeted element exists with data attributes", () => {

  let className, size, autoHide, platform, channel,
    sect, cat, subCategory, postname, brand, pos, type, site,
    container, factory, model, expectedModel, author;

  beforeEach(() => {
    className = "ad-billboard";
    size = "900x250";
    autoHide = "true";
    platform = "msite";
    channel = "news";
    sect = "categoryPage";
    cat = "primaryCategoryTest";
    subCategory = "secondaryCategoryTest";
    brand = "dulux";
    pos = "billboard";
    postname = "sample post";
    type = "javascript";
    author = "author";
    site = "rea";

    container = document.createElement("div");

    container.setAttribute("class", className);
    container.setAttribute("data-type", type);
    container.setAttribute("data-site", site);
    container.setAttribute("data-sz", size);
    container.setAttribute("data-auto-hide", autoHide);
    container.setAttribute("data-channel", channel);
    container.setAttribute("data-sect", sect);
    container.setAttribute("data-brand", brand);
    container.setAttribute("data-pos", pos);
    container.setAttribute("data-author", author);
    container.setAttribute("data-postname", postname);

    factory = new AdvertorialFactory(
      "primaryCategoryTest",
      "secondaryCategoryTest"
    );
    model = factory.createModelFromElement(container, platform);

    expectedModel = {
      "config": {
        "type": type,
        "site": site,
        "sz": size,
        "auto-hide": autoHide
      }, "params": {
        "platform": platform,
        "channel": channel,
        "cat": cat,
        "subCategory": subCategory,
        "sect": sect,
        "brand": brand,
        "pos": pos,
        "postname" : postname,
        "author" : author
      }
    };
  });

    it("returns an Advertorial model", () => {
      expect(model.getModel()).toEqual(expectedModel);
    });
  });
});

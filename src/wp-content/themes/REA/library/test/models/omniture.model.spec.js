import {
  OmnitureModel
} from "../../src/models";

describe("OmnitureModel", () => {
  let primaryCategory = "primary-category",
    secondaryCategory = "secondary-category",
    articleSlug = "news-article",
    pageNo = undefined,
    categoriesTags = "categories and tags",
    defaultEvents = "event12";

  describe("when on a category", () => {
    let pageType = "category";

    describe("and there is pagination", () => {
      let omnitureModel = new OmnitureModel(primaryCategory, undefined, 1, articleSlug, pageType, defaultEvents, categoriesTags);

      it("should create a category object with page number (prop40)", () => {
        expect(omnitureModel.create()).toEqual({
          "events": defaultEvents,
          "pageName": "rea:news:primary-category:category",
          "prop11": "rea:news:primary-category",
          "prop40": "rea:news:primary-category:1",
          "hier1": "rea|news|primary-category"
        });
      });
    });

    describe("there is no pagination", () => {
      let omnitureModel = new OmnitureModel(primaryCategory, undefined, undefined, articleSlug, pageType, defaultEvents, categoriesTags);

      it("should create a category object without page number (prop40)", () => {
        expect(omnitureModel.create()).toEqual({
          "events": "event12",
          "pageName": "rea:news:primary-category:category",
          "prop11": "rea:news:primary-category",
          "hier1": "rea|news|primary-category"
        });
      });
    });
  });

  describe("when on sub category", () => {
    let pageType = "category";

    describe("and there is pagination", () => {
      let omnitureModel = new OmnitureModel(primaryCategory, secondaryCategory, 1, articleSlug, pageType, defaultEvents, categoriesTags);

      it("should create a sub category object with page number (prop40)", () => {
        expect(omnitureModel.create()).toEqual({
          "events": "event12",
          "pageName": "rea:news:primary-category:secondary-category:subcategory",
          "prop11": "rea:news:primary-category",
          "prop12": "rea:news:primary-category:secondary-category",
          "prop40": "rea:news:primary-category:secondary-category:1",
          "hier1": "rea|news|primary-category|secondary-category"
        });
      });
    });

    describe("and there is no pagination", () => {
      let omnitureModel = new OmnitureModel(primaryCategory, secondaryCategory, undefined, articleSlug, pageType, defaultEvents, categoriesTags);

      it("should create a sub category object without page number (prop40)", () => {
        expect(omnitureModel.create()).toEqual({
          "events": "event12",
          "pageName": "rea:news:primary-category:secondary-category:subcategory",
          "prop11": "rea:news:primary-category",
          "prop12": "rea:news:primary-category:secondary-category",
          "hier1": "rea|news|primary-category|secondary-category"
        });
      });
    });
  });

  describe("when on a post", () => {
    let pageType = "post",
        postEvents = "event12,event11"

    describe("and there is a primary without secondary category", () => {
      let omnitureModel = new OmnitureModel(primaryCategory, undefined, pageNo, articleSlug, pageType, postEvents, categoriesTags);

      it("should create a post object with a primary and without the secondary category", () => {
        expect(omnitureModel.create()).toEqual({
          "events": "event12,event11",
          "pageName": "rea:news:primary-category:post",
          "prop11": `rea:news:${primaryCategory}`,
          "prop17": articleSlug,
          "prop32": categoriesTags,
          "hier1": `rea|news|${primaryCategory}`
        });
      });
    });

    describe("and there is primary and secondary category", () => {
      let omnitureModel = new OmnitureModel(primaryCategory, secondaryCategory, pageNo, articleSlug, pageType, postEvents, categoriesTags);

      it("should create a category post object with primary and secondary category", () => {
        expect(omnitureModel.create()).toEqual({
          "events": "event12,event11",
          "pageName": "rea:news:primary-category:secondary-category:post",
          "prop11": `rea:news:${primaryCategory}`,
          "prop12": `rea:news:${primaryCategory}:${secondaryCategory}`,
          "prop17": articleSlug,
          "prop32": categoriesTags,
          "hier1": `rea|news|${primaryCategory}|${secondaryCategory}`
        });
      });
    });

    describe("and the post belongs to news corp australia", () => {
      let tagName = "";
      let omnitureModel = new OmnitureModel(primaryCategory, secondaryCategory, pageNo, articleSlug, pageType, postEvents, categoriesTags, tagName, "nca");

      it("should create a post with source name prepended to article slug", () => {
        expect(omnitureModel.create()).toEqual({
          "events": "event12,event11",
          "pageName": "rea:news:primary-category:secondary-category:post",
          "prop11": `rea:news:${primaryCategory}`,
          "prop12": `rea:news:${primaryCategory}:${secondaryCategory}`,
          "prop17": `nca:${articleSlug}`,
          "prop32": categoriesTags,
          "hier1": `rea|news|${primaryCategory}|${secondaryCategory}`
        });
      });
    });
  });

  describe("when on an author details", () => {
    let pageType = "author",
        omnitureModel = new OmnitureModel(primaryCategory, secondaryCategory, pageNo, articleSlug, pageType, defaultEvents, categoriesTags);

    it("should create a author object", () => {
      expect(omnitureModel.create()).toEqual({
        "events": "event12",
        "pageName": "rea:news:authordetails",
        "prop11": "rea:news:authordetails",
        "hier1": "rea|news|authordetails"
      });
    });
  });

  describe("when on a tag", () => {
    let pageType = "tag",
        tagName = "nsw";

    describe("and there is pagination", () => {
      let omnitureModel = new OmnitureModel(primaryCategory, secondaryCategory, 1, articleSlug, pageType, defaultEvents, categoriesTags, tagName);

      it("should create a tag object with page number (prop40)", () => {
        expect(omnitureModel.create()).toEqual({
          "events": "event12",
          "pageName": "rea:news:nsw:tag",
          "prop11": "rea:news:nsw",
          "prop40": "rea:news:nsw:1",
          "hier1": "rea|news|nsw"
        });
      });
    });

    describe("and there is no pagination", () => {
      let omnitureModel = new OmnitureModel(primaryCategory, secondaryCategory, undefined, articleSlug, pageType, defaultEvents, categoriesTags, tagName);

      it("should create a tag object without page number (prop40)", () => {
        expect(omnitureModel.create()).toEqual({
          "events": "event12",
          "pageName": "rea:news:nsw:tag",
          "prop11": "rea:news:nsw",
          "hier1": "rea|news|nsw"
        });
      });
    });
  });

  describe("when events is empty", () => {
    let pageType = "author",
        omnitureModel = new OmnitureModel(primaryCategory, secondaryCategory, pageNo, articleSlug, pageType, "");

    it("should default to defaultEvents", () => {
      expect(omnitureModel.create()).toEqual({
        "events": "event12",
        "pageName": "rea:news:authordetails",
        "prop11": "rea:news:authordetails",
        "hier1": "rea|news|authordetails"
      });
    });
  });
});


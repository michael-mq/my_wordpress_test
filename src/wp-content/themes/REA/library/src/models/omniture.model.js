class OmnitureModel {

  static defaultEvents = "event12";

  constructor(primaryCategory, secondaryCategory, pageNo, articleSlug, pageType, events, categoriesTags, tagName, sourceName) {
    this.primaryCategory = primaryCategory;
    this.secondaryCategory = secondaryCategory;
    this.pageNo = pageNo;
    this.articleSlug = articleSlug;
    this.pageType = pageType;
    this.events = events || OmnitureModel.defaultEvents;
    this.categoriesTags = categoriesTags;
    this.tagName = tagName;
    this.sourceName = sourceName;
  }

  create() {
    let model = {};

    if (this.pageType === "category") {
      if (this.secondaryCategory) {
        model = {
          "events": this.events,
          "pageName": `rea:news:${this.primaryCategory}:${this.secondaryCategory}:subcategory`,
          "prop11": `rea:news:${this.primaryCategory}`,
          "prop12": `rea:news:${this.primaryCategory}:${this.secondaryCategory}`,
          "hier1": `rea|news|${this.primaryCategory}|${this.secondaryCategory}`
        };

        if (this.pageNo) {
          Object.assign(model, { "prop40": `rea:news:${this.primaryCategory}:${this.secondaryCategory}:${this.pageNo}` })
        }
        return model;
      }

      model = {
        "events": this.events,
        "pageName": `rea:news:${this.primaryCategory}:category`,
        "prop11": `rea:news:${this.primaryCategory}`,
        "hier1": `rea|news|${this.primaryCategory}`
      };

      if (this.pageNo) {
        Object.assign(model, { "prop40": `rea:news:${this.primaryCategory}:${this.pageNo}` });
      }
    }

    if (this.pageType === "post") {
      let prop17Value = this.sourceName ? `${this.sourceName}:${this.articleSlug}` : this.articleSlug;
      model = {
        "events": this.events,
        "pageName": `rea:news:${this.primaryCategory}:post`,
        "prop11": `rea:news:${this.primaryCategory}`,
        "prop17": prop17Value,
        "prop32": this.categoriesTags,
        "hier1": `rea|news|${this.primaryCategory}`
      };

      if (this.secondaryCategory) {
        Object.assign(model, {
          "pageName": `rea:news:${this.primaryCategory}:${this.secondaryCategory}:post`,
          "prop12": `rea:news:${this.primaryCategory}:${this.secondaryCategory}`,
          "hier1": `rea|news|${this.primaryCategory}|${this.secondaryCategory}`
        });
      }
    }

    if (this.pageType === "author") {
      model = {
        "events": this.events,
        "pageName": "rea:news:authordetails",
        "prop11": "rea:news:authordetails",
        "hier1": "rea|news|authordetails"
      };
    }

    if (this.pageType === "tag") {
      model = {
        "events": this.events,
        "pageName": `rea:news:${this.tagName}:tag`,
        "prop11": `rea:news:${this.tagName}`,
        "hier1": `rea|news|${this.tagName}`
      };

      if (this.pageNo) {
        Object.assign(model, { "prop40": `rea:news:${this.tagName}:${this.pageNo}` });
      }
    }

    return model;
  }
}

export default OmnitureModel;

import {DomUtils, AdvertorialFactory} from "./utilities";
import {AnalyticsService, HttpRequestService, HttpConfig} from "./services";
import Article from "./article";
import {CategorisationModel, OmnitureModel} from "./models";
import App from "./app";

let primary_categories = [
  "building",
  "renovating",
  "buying",
  "renting",
  "selling",
  "finance",
  "investing",
  "calculators",
  "dream-homes",
  "news"
];
let secondary_categories = [
  "regulations",
  "energy-efficiency",
  "home-design",
  "how-to-build",
  "bathroom-renovations",
  "eco-friendly",
  "how-to-renovate",
  "kitchen-renovations",
  "outdoor-living",
  "moving",
  "apartments",
  "first-home",
  "first-home-owners-grant",
  "how-to-buy-a-home",
  "flatmates",
  "how-to-rent",
  "pet-friendly",
  "tenants-rights",
  "how-to-sell-your-house",
  "real-estate-agents",
  "styling-to-sell",
  "budgeting",
  "home-loans",
  "how-to-invest-in-property",
  "landlord",
  "capital-gains",
  "negative-gearing",
  "architecture",
  "decorating",
  "interior-design",
  "celebrity-homes",
  "property-market-trends",
  "quirky",
  "three-birds-renovations"
];

let globalData = document.getElementById("global-data"),
    categories = globalData.dataset.categories,
    pageNo = globalData.dataset.pageNo,
    articleSlug = globalData.dataset.articleSlug,
    pageType = globalData.dataset.pageType,
    events = globalData.dataset.events,
    categories_tags = globalData.dataset.categoriesTags,
    tagName = globalData.dataset.tagName,
    sourceName = globalData.dataset.sourceName;

categories = categories ? JSON.parse(categories) : [];

let categorisation = new CategorisationModel(
  Array.from(categories).map(category => category.slug),
  primary_categories,
  secondary_categories
);

let omnitureDataModel = new OmnitureModel(
  categorisation.primaryCategory(),
  categorisation.secondaryCategory(),
  pageNo,
  articleSlug,
  pageType,
  events,
  categories_tags,
  tagName,
  sourceName);

let app = new App(
  new DomUtils(window),
  new AdvertorialFactory(
    categorisation.primaryCategory(),
    categorisation.secondaryCategory()
  ),
  new Article(Math.max(document.documentElement.clientWidth, window.innerWidth || 0)),
  new AnalyticsService(
    HttpRequestService,
    process.env.NODE_ENV === "development" ? HttpConfig.staging : HttpConfig.production)
);

const defaultRuiHeaderHeight = 92;
const defaultAdGutter = 20
const mobileMaxWidth = 639;
const tabletMinWidth = 640;
const tabletMaxWidth = 970;

let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
let isTabletViewport = viewportWidth > tabletMinWidth && viewportWidth < tabletMaxWidth;
let isSticky = viewportWidth > mobileMaxWidth;
let ruiHeader = document.getElementsByClassName("rui-header")[0];
let ruiHeaderHeight = (ruiHeader) ? ruiHeader.offsetHeight : defaultRuiHeaderHeight;
let adOffsetTop = (isTabletViewport) ? defaultAdGutter : ruiHeaderHeight + defaultAdGutter;

// Specify sticky flag and offset from top value in pixels to implement sticky medrec ad on article page
let stickyAdConfig = {
  sticky: isSticky,
  offsetTop: adOffsetTop
}

// Money maker
app.renderAds(document.getElementsByClassName("ad-halfpage"));
app.renderAds(document.getElementsByClassName("ad-medrec-mobile"));
app.renderAds(document.getElementsByClassName("ad-medrec-tablet"));
app.renderAds(document.getElementsByClassName("ad-medrec--all-devices"), stickyAdConfig);
app.renderAds(document.getElementsByClassName("ad-billboard"));
app.renderAds(document.getElementsByClassName("ad-leaderboard"));

// Render items on article, home page etc.
app.renderArticle(document.getElementsByClassName("media-viewer"));

// Read More button
app.renderReadMoreButton(document.getElementById("read-more"));

// Media Telemetry
app.sendPageViewEvent();
app.sendInitialOrientation();

// Omniture
app.initializeOmniture(omnitureDataModel.create());

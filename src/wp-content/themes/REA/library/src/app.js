import React from "react";
import ReactDOM from "react-dom";
import {Advertorial, ReadMoreButton} from "./components";
import RuiAdvertorial from "rui-advertorial";
import {MobileDetect} from "./utilities";
import Omniture from "./legacy/omniture";

class App {
  constructor(domUtils, advertorialFactory, article, analyticsService, mobileDetect = MobileDetect) {
    this.domUtils = domUtils;
    this.advertorialFactory = advertorialFactory;
    this.article = article;
    this.analyticsService = analyticsService;
    this.platform = mobileDetect.isMobile() ? "msite" : "";
  }

  renderAds(adsElement, options = {})  {
    if (!adsElement || adsElement < 1) {
      return;
    }

    Array.from(adsElement).forEach(adElement => {
      let advertorialModel = this.advertorialFactory.createModelFromElement(adElement, this.platform);

      ReactDOM.render(
        <Advertorial
          container={adElement}
          visibility={this.domUtils.getVisibilityValue(adElement) }
          display={this.domUtils.getDisplayValue(adElement) }
          config={advertorialModel.getConfig() }
          params={advertorialModel.getParams() }
          advertorialService={RuiAdvertorial}
          sticky={options.sticky || false}
          offsetTop={options.offsetTop || 0}
        />, adElement
      );
    });
  }

  renderReadMoreButton(readMoreButtonNode) {
    if (readMoreButtonNode) {
      ReactDOM.render(<ReadMoreButton analyticsService={this.analyticsService}/>, readMoreButtonNode);
    }
  }

  renderArticle(mediaViewerNode) {
    this.article.injectGalleries(mediaViewerNode);
  }

  sendPageViewEvent() {
    this.analyticsService.sendPageViewEvent();
  }

  sendInitialOrientation() {
    this.analyticsService.sendOrientationEvent();
  }

  initializeOmniture(omnitureDataModel) {
    let omniture = new Omniture(omnitureDataModel, window);

    omniture.initializeTracking();
  }
}

export default App;

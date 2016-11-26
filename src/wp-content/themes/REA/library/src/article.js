import React from "react";
import ReactDOM from "react-dom";
import NewsMediaViewer from "./components/news-media-viewer.component";
import {AnalyticsService, HttpRequestService, HttpConfig} from "./services";

export default class Article {
  constructor(viewportWidth) {
    this.viewportWidth = viewportWidth;
    this.endpoint = process.env.NODE_ENV === "development" ? HttpConfig.staging : HttpConfig.production; // dev uses staging
  }

  generateMediaViewerSlide(imageOptions) {
    let sortedImages = Array.from(imageOptions).sort((currentImage, nextImage) => {
      return currentImage.width - nextImage.width;
    });

    let suitableSize = sortedImages.find((image) => {
      return image.width >= this.viewportWidth;
    });

    if (!suitableSize) {
      suitableSize = sortedImages[sortedImages.length - 1];
    }

    return suitableSize;
  }

  generateMediaViewerSlides(galleryNode) {
    let imageNodes = galleryNode.querySelectorAll(".gallery-item .wp-image");
    let slides = Array.from(imageNodes).map((imageNode) => {
      let imageOptions = JSON.parse(imageNode.dataset.images);
      return this.generateMediaViewerSlide(imageOptions);
    });

    return slides;
  }

  injectGalleries(galleries) {
    Array.from(galleries).map((galleryNode) => {
      var slides = this.generateMediaViewerSlides(galleryNode);
      ReactDOM.render(<NewsMediaViewer images={slides} analyticsService={new AnalyticsService(HttpRequestService, this.endpoint)} />, galleryNode);
    });
  }
}

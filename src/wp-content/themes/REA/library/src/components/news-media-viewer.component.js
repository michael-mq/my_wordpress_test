import React from "react";
import NewsMediaViewerGallery from "./news-media-viewer-gallery.component";

import UUID from "../utilities/uuid.utils";

require("../styles/news-media-viewer.scss");

class NewsMediaViewer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.galleryInstanceId = UUID.generate();

    let data = this.props.images.map((image) => {
      let currentImage = {
        src: image.source,
        w: image.width,
        h: image.height
      }

      if (image.caption) {
        currentImage["title"] = image.caption;
      }

      return currentImage;
    });

    this.setState({ data: data, isOpen: false });
  }

  isTogglable() {
    return this.state.data.length > 1;
  }

  toggleMediaViewer() {
    if (this.isTogglable()) {
      if (this.state.isOpen) {
        this.setState({ isOpen: false });
        this.props.analyticsService.sendMediaViewerClosedEvent(this.galleryInstanceId);
      } else {
        this.setState({ isOpen: true });
        this.props.analyticsService.sendMediaViewerOpenedEvent(this.galleryInstanceId);
        this.props.analyticsService.sendMediaViewerSlideViewEvent(this.galleryInstanceId);
      }
    }
  }

  onSlideChange() {
    this.props.analyticsService.sendMediaViewerSlideViewEvent(this.galleryInstanceId);
  }

  renderMediaViewerBar() {
    if (this.isTogglable()) {
      return (
        <div className="media-viewer-bar">
          View gallery ({this.state.data.length})
        </div>
      );
    }
  }

  renderMediaViewerGallery() {
    return (
      <NewsMediaViewerGallery
        onClose={this.toggleMediaViewer.bind(this)}
        items={this.state.data}
        onSlideChange={this.onSlideChange.bind(this)}/>
    );
  }

  render() {
    if (this.state.isOpen) {
      return (
        <div className="media-viewer-gallery">
          {this.renderMediaViewerGallery()}
        </div>
      )
    }

    let coverClasses = this.isTogglable() ? "media-viewer-cover is-selectable" : "media-viewer-cover";

    return (
      <div className={coverClasses} onClick={this.toggleMediaViewer.bind(this)}>
        <img className="media-viewer-cover-image" src={this.state.data[0].src} />
        {this.renderMediaViewerBar()}
      </div>
    );
  }

}

NewsMediaViewer.propTypes = {
  images: React.PropTypes.array.isRequired
};

export default NewsMediaViewer;

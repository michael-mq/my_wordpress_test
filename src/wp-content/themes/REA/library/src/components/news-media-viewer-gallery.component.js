import React from "react";
import ReactDOM from "react-dom";
import PhotoSwipe from "photoswipe";
import PhotoSwipeUIDefault from "photoswipe/dist/photoswipe-ui-default";

require("photoswipe/dist/photoswipe.css");
require("photoswipe/dist/default-skin/default-skin.css");

class NewsMediaViewerGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const options = {
      caption: false
    };

    let mediaViewerGallery = new PhotoSwipe(ReactDOM.findDOMNode(this), PhotoSwipeUIDefault, this.props.items, options);
    mediaViewerGallery.init();

    mediaViewerGallery.listen("close", this.props.onClose);

    mediaViewerGallery.listen("afterChange", this.props.onSlideChange);
  }

  render() {
    return (
      <div className="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <div className="pswp__bg"></div>
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item"></div>
            <div className="pswp__item"></div>
            <div className="pswp__item"></div>
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter"></div>
              <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip"></div>
            </div>
            <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>
            <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)" title="Next (arrow right)">
            </button>
            <div className="pswp__caption">
              <div className="pswp__caption__center"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsMediaViewerGallery;

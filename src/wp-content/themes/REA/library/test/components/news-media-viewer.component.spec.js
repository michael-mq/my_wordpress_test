import React from "react";
import {shallow} from "enzyme";

import {NewsMediaViewer} from "../../src/components";
import {AnalyticsService}  from "../../src/services";

describe("NewsMediaViewer", () => {
  let mockRequest = {
    post: () => {}
  };
  let analyticsService = new AnalyticsService(mockRequest, "http://localhost");

  describe("has supported photo sizes larger than the viewport", () => {
    describe("has one photo", () => {
      let component;

      let images = [{
        source: "one.jpg",
        width: 100,
        height: 80
      }];

      beforeEach(() => {
        spyOn(analyticsService, "sendMediaViewerOpenedEvent");
        component = shallow(<NewsMediaViewer images={images} analyticsService={analyticsService}/>);
      });

      describe("when it initially loads", () => {
        it("does not render the media viewer bar", () => {
          expect(component.find(".media-viewer-bar").length).toBe(0);
        });

        it("does not open the media viewer gallery", () => {
          expect(component.find("media-viewer-gallery").length).toBe(0);
        });

        it("does render the cover photo", () => {
          expect(component.find(".media-viewer-cover").length).toBe(1);
        });

        it("does not enable the pointer cursor", () => {
          expect(component.find(".media-viewer-cover").hasClass("is-selectable")).toBeFalsy();
        });
      });

      describe("when the cover photo is selected", () => {
        beforeEach(() => {
          component.find(".media-viewer-cover").simulate("click");
        });

        it("does render the cover photo", () => {
          expect(component.find(".media-viewer-cover").length).toBe(1);
        });

        it("does not open the media viewer gallery", () => {
          expect(component.find(".media-viewer-gallery").length).toBe(0);
        });

        it("does not send a media-viewer-open event", () => {
          expect(analyticsService.sendMediaViewerOpenedEvent).not.toHaveBeenCalled();
        });
      });
    });

    describe("has more than one photo", () => {
      let component;

      let images = [{
        source: "one.jpg",
        width: 8,
        height: 9,
        caption: "This is the caption."
      }, {
        source: "two.jpg",
        width: 10,
        height: 20
      }];

      beforeEach(() => {
        spyOn(analyticsService, "sendMediaViewerOpenedEvent");
        spyOn(analyticsService, "sendMediaViewerClosedEvent");
        spyOn(analyticsService, "sendMediaViewerSlideViewEvent");
        component = shallow(<NewsMediaViewer images={images} analyticsService={analyticsService} />);
      });

      describe("when it initially loads", () => {
        it("renders the cover photo", () => {
          expect(component.find(".media-viewer-cover").length).toBe(1);
        });

        it("renders the first photo in the data as the cover photo", () => {
          expect(component.find(".media-viewer-cover-image").props().src).toEqual("one.jpg");
        });

        it("does not render the media viewer gallery", () => {
          expect(component.find(".media-viewer-gallery").length).toBe(0);
        });

        it("renders the media viewer bar", () => {
          expect(component.find(".media-viewer-bar").length).toBe(1);
        });

        it("renders the number of photos in the gallery", () => {
          expect(component.find(".media-viewer-bar").text()).toContain("2");
        });

        it("does enable the pointer cursor", () => {
          expect(component.find(".media-viewer-cover").hasClass("is-selectable")).toBeTruthy();
        });

        it("parses the image data correctly", () => {
          expect(component.state().data).toEqual([
            {
              src: "one.jpg",
              w: 8,
              h: 9,
              title: "This is the caption."
            }, {
              src: "two.jpg",
              w: 10,
              h: 20
            }
          ]);
        });
      });

      describe("when the cover photo is selected", () => {
        beforeEach(() => {
          component.find(".media-viewer-cover").simulate("click");
        });

        it("does not render the cover photo", () => {
          expect(component.find(".media-viewer-cover").length).toBe(0);
        });

        it("renders the gallery", () => {
          expect(component.find(".media-viewer-gallery").length).toBe(1);
        });

        it("sends a media-viewer-open event", () => {
          expect(analyticsService.sendMediaViewerOpenedEvent).toHaveBeenCalled();
        });

        it("sends a media-viewer-slide-view event", () => {
          expect(analyticsService.sendMediaViewerSlideViewEvent).toHaveBeenCalled();
        });

        describe("when a new slide is viewed", () => {
          it("sends a media-viewer-slide-view event", () => {
            component.children().props().onSlideChange();
            expect(analyticsService.sendMediaViewerSlideViewEvent).toHaveBeenCalled();
          });
        });

        describe("when the gallery is closed", () => {
          it("sends a media-viewer-close event", () => {
            component.children().props().onClose();
            expect(analyticsService.sendMediaViewerClosedEvent).toHaveBeenCalled();
          });
        });
      });
    });
  });
});

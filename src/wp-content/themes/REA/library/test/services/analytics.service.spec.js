import AnalyticsService from "../../src/services/analytics.service";

describe("AnalyticsService", () => {
  let analyticsService;
  let httpRequestService;
  let endpoint = "http://analyticsEndpoint";
  let uuid = "9aa8ce00-3563-4d05-9b3c-2238a49d114e";
  let buildPayLoad = (action, subjectName, subject, buildNumber = "DEV") => {
    let payload = {
      event: {
        version: "v1",
        subject: subjectName,
        action: action,
        occurredat: jasmine.any(String),
        source: {
          type: "webpage",
          webpage: {
            headers: {
              useragent: jasmine.any(String),
              cookies: jasmine.any(Object)
            },
            url: window.location.href
          },
          continuity: {
            sessionid: jasmine.any(String),
            sequencenumber: jasmine.any(Number)
          },
          application: {
            owner: "/rea/maprs",
            name: "news",
            build: buildNumber,
            gitsha: "DEV"
          }
        }
      },
      subject: subject
    };

    return payload;
  }

  beforeEach(() => {
    httpRequestService = {
      post() { }
    };
    spyOn(httpRequestService, "post");
    analyticsService = new AnalyticsService(
      httpRequestService,
      endpoint
    );
  });

  describe("Gallery", () => {
    it("sends a gallery opened event", () => {
      analyticsService.sendMediaViewerOpenedEvent(uuid);

      expect(httpRequestService.post).toHaveBeenCalledWith(endpoint, buildPayLoad("opened", "/rea/maprs/news/article/gallery", { uuid: uuid }));
    });

    it("sends a gallery closed event", () => {
      analyticsService.sendMediaViewerClosedEvent(uuid);

      expect(httpRequestService.post).toHaveBeenCalledWith(endpoint, buildPayLoad("closed", "/rea/maprs/news/article/gallery", { uuid: uuid }));
    });

    it("sends a gallery slide view event", () => {
      analyticsService.sendMediaViewerSlideViewEvent(uuid);

      expect(httpRequestService.post).toHaveBeenCalledWith(endpoint, buildPayLoad("viewed", "/rea/maprs/news/article/gallery/image", { uuid: uuid }));
    });
  });

  describe("On page load", () => {

    it("sends page view event ", () => {
      analyticsService.sendPageViewEvent();

      expect(httpRequestService.post).toHaveBeenCalledWith(endpoint, buildPayLoad("viewed", "/rea/maprs/news/page", {}));
    });

    describe("when the window's inner height is more than the window's inner width", () => {
      it("then send a page view event with the subject's orientation set to portrait", () => {
        let service = new AnalyticsService(
          httpRequestService,
          endpoint
        );

        service.sendOrientationEvent(300, 600);

        expect(httpRequestService.post).toHaveBeenCalledWith(endpoint, buildPayLoad("orientation-changed", "/rea/maprs/news/page", { orientation: "portrait" }));
      });
    });

    describe("when the window's inner width is more than the window's inner height", () => {
      it("then send a page view event with the subject's orientation set to landscape", () => {
        let service = new AnalyticsService(
          httpRequestService,
          endpoint
        );
        service.sendOrientationEvent(600, 300);

        expect(httpRequestService.post).toHaveBeenCalledWith(endpoint, buildPayLoad("orientation-changed", "/rea/maprs/news/page", { orientation: "landscape" }));
      });
    });
  });

  describe("Read more button", () => {
    it("sends a read more clicked event", () => {
      let now = Date.now(),
        domComplete = performance.timing.domComplete,
        navigationStart = performance.timing.navigationStart,
        sinceDomComplete = (now - performance.timing.domComplete) / 1000,
        sinceNavigationStart = (now - performance.timing.navigationStart) / 1000;

      analyticsService.sendReadMoreClickedEvent(now, domComplete, navigationStart);

      expect(httpRequestService.post).toHaveBeenCalledWith(endpoint, buildPayLoad("clicked", "/rea/maprs/news/article/read-more-button", {
        sinceDomComplete: sinceDomComplete,
        sinceNavigationStart: sinceNavigationStart
      }));
    });
  });
});

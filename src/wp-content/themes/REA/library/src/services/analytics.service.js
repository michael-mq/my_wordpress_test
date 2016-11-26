import buildNumber from "../buildnumber"; // This file will be built by buildtasks/package_app/run.sh and will only happen in CI
import gitSha from "../gitsha"; // This file will be built by buildtasks/package_app/run.sh and will only happen in CI
import CookieUtils from "../utilities/cookie.utils";
import LocalStorageUtils from "../utilities/local-storage.utils"

class AnalyticsService {
  constructor(httpRequestService, analyticsEndpoint) {
    this.httpRequestService = httpRequestService;
    this.analyticsEndpoint = analyticsEndpoint;
  }

  buildPayLoad(action, subjectName, subject) {
    return {
      event: {
        version: "v1",
        subject: subjectName,
        action: action,
        occurredat: (Date.now() / 1000).toString(),
        source: {
          type: "webpage",
          webpage: {
            headers: {
              useragent: navigator.userAgent,
              cookies: CookieUtils.grab(["reauid", "s_vi"])
            },
            url: window.location.href
          },
          continuity: {
            sessionid: LocalStorageUtils.getContinuitySessionId(),
            sequencenumber: LocalStorageUtils.getContinuitySequenceNumber()
          },
          application: {
            owner: "/rea/maprs",
            name: "news",
            build: buildNumber,
            gitsha: gitSha
          }
        }
      },
      subject: subject
    };
  }

  sendMediaViewerOpenedEvent(galleryInstanceId) {
    this.httpRequestService.post(
      this.analyticsEndpoint,
      this.buildPayLoad("opened", "/rea/maprs/news/article/gallery", {
        uuid: galleryInstanceId
      })
    );
  }

  sendMediaViewerClosedEvent(galleryInstanceId) {
    this.httpRequestService.post(
      this.analyticsEndpoint,
      this.buildPayLoad("closed", "/rea/maprs/news/article/gallery", {
        uuid: galleryInstanceId
      })
    );
  }

  sendMediaViewerSlideViewEvent(galleryInstanceId) {
    this.httpRequestService.post(
      this.analyticsEndpoint,
      this.buildPayLoad("viewed", "/rea/maprs/news/article/gallery/image", {
        uuid: galleryInstanceId
      })
    );
  }

  sendPageViewEvent() {
    this.httpRequestService.post(
      this.analyticsEndpoint,
      this.buildPayLoad("viewed", "/rea/maprs/news/page", {}));
  }

  sendOrientationEvent(innerWidth = window.innerWidth, innerHeight = window.innerHeight) {
    let orientation = innerHeight > innerWidth ? "portrait" : "landscape";

    this.httpRequestService.post(
      this.analyticsEndpoint,
      this.buildPayLoad("orientation-changed", "/rea/maprs/news/page", { orientation: orientation }));
  }

  sendReadMoreClickedEvent(epochNow, domComplete, navigationStart) {
    this.httpRequestService.post(
      this.analyticsEndpoint,
      this.buildPayLoad("clicked", "/rea/maprs/news/article/read-more-button",
        {
          sinceDomComplete: (epochNow - domComplete) / 1000,
          sinceNavigationStart: (epochNow - navigationStart) / 1000
        }
      )
    );
  }
}

export default AnalyticsService;

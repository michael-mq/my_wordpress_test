import {AnalyticsService} from "../src/services";

describe("App", () => {
  let endpoint = "http://exampleEndpoint";
  let httpRequestService, analyticsService;

  beforeEach(() => {
    httpRequestService = {
      post() { }
    };
    spyOn(httpRequestService, "post");
    spyOn(document, "addEventListener");
    analyticsService = new AnalyticsService(
      httpRequestService,
      endpoint
    ),
    spyOn(analyticsService, "sendOrientationEvent");
  });
});

import React from "react";
import {shallow} from "enzyme";

import {ReadMoreButton} from "../../src/components";
import {AnalyticsService}  from "../../src/services";

describe("ReadMoreButton", () => {
  let mockRequest = {
    post: () => { }
  };

  let component;

  let mockAnalyticsService = new AnalyticsService(mockRequest, "http://localhost");


  beforeEach(() => {
    spyOn(mockAnalyticsService, "sendReadMoreClickedEvent");

    component = shallow(<ReadMoreButton analyticsService={mockAnalyticsService} />);

    component.find("button").simulate("click");
  });


  it("should send read more click event", () => {
    expect(mockAnalyticsService.sendReadMoreClickedEvent).toHaveBeenCalled();
  });


  it("should hide read more button on click", () => {
    expect(component.state("expanded")).toBeTruthy();
    expect(component.find("button").length).toBe(0);
  });

});

import React from "react";
import {mount, shallow} from "enzyme";
import {Advertorial, StickyContainer} from "../../src/components";

describe("Advertorial", () => {
  let id = "ad-billboard",
    config = {
      "type": "javascript",
      "site": "rea",
      "sz": "970x250",
      "auto-hide": "true"
    },
    params = {
      "platform": "msite",
      "channel": "news",
      "sect": "categorypage",
      "cat": "",
      "subcategory": "",
      "brand": "",
      "pos": "billboard"
    },
    container,
    ruiAdvertorial = { createAd: () => { } }
    ;

  beforeEach(() => {
    spyOn(ruiAdvertorial, "createAd");
  });

  describe("given the target element exists", () => {

    describe("and the visibility attribute exists", () => {

      describe("when the visibility attribute is set to visible", () => {

        it("then RUI AdvertorialService should create the correct payload", () => {
          container = document.createElement("div");
          container.setAttribute("id", id);

          mount(
             <Advertorial
              container={container}
              visibility={"visible"}
              display={null}
              config={config}
              params={params}
              advertorialService={ruiAdvertorial}/>
          );

          expect(ruiAdvertorial.createAd).toHaveBeenCalledWith({ config: config, params: params, container: jasmine.any(Object) });
        });
      });

      describe("when the visibility attribute is set to hidden", () => {

        it("then RUI AdvertorialService should not create", () => {
          container = document.createElement("div");
          container.setAttribute("id", id);

          mount(
            <Advertorial
              container={container}
              visibility={"hidden"}
              display={null}
              config={config}
              params={params}
              advertorialService={ruiAdvertorial}/>
          );

          expect(ruiAdvertorial.createAd).not.toHaveBeenCalled();
        });

      });

    });

    describe("and the display attribute exists", () => {

      describe("when the display attribute is not set to none", () => {

        it("then RUI AdvertorialService should create the correct payload", () => {
          container = document.createElement("div");
          container.setAttribute("id", id);

          mount(
            <Advertorial
              container={container}
              visibility={null}
              display={"block"}
              config={config}
              params={params}
              advertorialService={ruiAdvertorial}/>
          );

          expect(ruiAdvertorial.createAd).toHaveBeenCalledWith({ config: config, params: params, container: jasmine.any(Object) });
        });
      });

      describe("when the display attribute is set to none", () => {

        it("then RUI AdvertorialService should not create", () => {
          container = document.createElement("div");
          container.setAttribute("id", id);

          mount(
            <Advertorial
              container={container}
              visibility={null}
              display={"none"}
              config={config}
              params={params}
              advertorialService={ruiAdvertorial}/>
          );

          expect(ruiAdvertorial.createAd).not.toHaveBeenCalled();
        });

      });

      describe("Sticky ads", function() {

        describe("when the sticky attribute is set to true with offsetTop value", () => {
          it("then render StickyContainer component with inner Advertorial component", function() {
            container = document.createElement("div");
            container.setAttribute("id", id);

            const component = shallow(
              <Advertorial
                container={container}
                visibility={"visible"}
                display={null}
                config={config}
                params={params}
                sticky={true}
                offsetTop={92}
                advertorialService={ruiAdvertorial}/>
            );

            expect(component.find(StickyContainer).length).toBe(1);
            expect(component.props().offsetTop).toEqual(92);
          });

        });

        describe("when the sticky attribute is not set", () => {
          it("then render Advertorial component only", function() {
            container = document.createElement("div");
            container.setAttribute("id", id);

            const component = shallow(
              <Advertorial
                container={container}
                visibility={"visible"}
                display={null}
                config={config}
                params={params}
                advertorialService={ruiAdvertorial}/>
            );

            expect(component.find(StickyContainer).length).toBe(0);
            expect(component.find("div").length).toBe(1);
          });

        });
      });

    });
  });

  describe("given the target element does not exist", () => {
    it("then RUI AdvertorialService should not create", () => {
      container = null;

      mount(
        <Advertorial
          container={container}
          visibility={"visible"}
          display={"block"}
          config={config}
          params={params}
          advertorialService={ruiAdvertorial}/>
      );

      expect(ruiAdvertorial.createAd).not.toHaveBeenCalled();
    });
  });
});

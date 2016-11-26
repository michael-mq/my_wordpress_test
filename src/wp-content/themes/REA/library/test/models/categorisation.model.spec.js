import Categorisation from "../../src/models/categorisation.model";

describe("Categorisation", () => {

  describe("when there is only one whitelisted category", () => {
    let categorisation = new Categorisation(
      ["A", "B", "C"],
      ["B"],
      ["C"]
    );

    it("identifies the primary category", () => {
      expect(categorisation.primaryCategory()).toEqual("B");
    });

    it("identifies the secondary category", () => {
      expect(categorisation.secondaryCategory()).toEqual("C");
    });
  });

  describe("when there are multiple whitelisted categories", () => {
    let categorisation = new Categorisation(
      ["A", "B", "C", "D"],
      ["A", "C"],
      ["B", "D"]
    );

    it("identifies the primary category", () => {
      expect(categorisation.primaryCategory()).toEqual("A");
    });

    it("identifies the secondary category", () => {
      expect(categorisation.secondaryCategory()).toEqual("B");
    });
  });

  describe("when there are whitelisted categories out of order", () => {
    let categorisation = new Categorisation(
      ["A", "B", "D", "F", "L"],
      ["F", "B"],
      ["L", "D"]
    );

    it("identifies the primary category", () => {
      expect(categorisation.primaryCategory()).toEqual("F");
    });

    it("identifies the secondary category", () => {
      expect(categorisation.secondaryCategory()).toEqual("L");
    });
  });

  describe("when there are no whitelisted categories intesecting", () => {
    let categorisation = new Categorisation(
      ["A", "B", "D", "F", "L"],
      ["F"],
      ["M"]
    );

    it("identifies the empty secondary category", () => {
      expect(categorisation.secondaryCategory()).toBeUndefined();
    });
  });
});

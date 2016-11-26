import Article from "../src/article";

describe("Article", () => {
  describe("creates a slide", () => {
    let imageOptions = [{
      source: "image-a.jpg",
      width: 400,
      height: 300,
      caption: "One"
    }, {
      source: "image-c.jpg",
      width: 800,
      height: 600,
      caption: "Three"
    }, {
      source: "image-b.jpg",
      width: 640,
      height: 480,
      caption: "Two"
    }];

    describe("when larger images are available", () => {
      let article = new Article(500);

      it("contains the image source of the first larger image", () => {
        let slide = article.generateMediaViewerSlide(imageOptions);
        expect(slide).toEqual({
          source: "image-b.jpg",
          width: 640,
          height: 480,
          caption: "Two"
        });
      });
    });

    describe("when an equally-sized image are available", () => {
      let article = new Article(800);

      it("contains the image source of the equally-sized image", () => {
        let slide = article.generateMediaViewerSlide(imageOptions);
        expect(slide).toEqual({
          source: "image-c.jpg",
          width: 800,
          height: 600,
          caption: "Three"
        });
      });
    });

    describe("when no larger images are available", () => {
      let article = new Article(1000);

      it("contains the image source of the largest image", () => {
        let slide = article.generateMediaViewerSlide(imageOptions);
        expect(slide).toEqual({
          source: "image-c.jpg",
          width: 800,
          height: 600,
          caption: "Three"
        });
      });
    });
  });
});

const SVG = require("../svg");

test("ellipse setters", () => {
  expect(SVG.ellipse().radius(5, 6).getAttribute("rx")).toBe("5");
  expect(SVG.ellipse().radius(5, 6).getAttribute("ry")).toBe("6");
  expect(SVG.ellipse().setRadius(5, 6).getAttribute("rx")).toBe("5");
  expect(SVG.ellipse().setRadius(5, 6).getAttribute("ry")).toBe("6");
  expect(SVG.ellipse().origin(2, 3).getAttribute("cx")).toBe("2");
  expect(SVG.ellipse().origin(2, 3).getAttribute("cy")).toBe("3");
  expect(SVG.ellipse().setOrigin(2, 3).getAttribute("cx")).toBe("2");
  expect(SVG.ellipse().setOrigin(2, 3).getAttribute("cy")).toBe("3");
  expect(SVG.ellipse().center(2, 3).getAttribute("cx")).toBe("2");
  expect(SVG.ellipse().center(2, 3).getAttribute("cy")).toBe("3");
  expect(SVG.ellipse().setCenter(2, 3).getAttribute("cx")).toBe("2");
  expect(SVG.ellipse().setCenter(2, 3).getAttribute("cy")).toBe("3");
  expect(SVG.ellipse().position(2, 3).getAttribute("cx")).toBe("2");
  expect(SVG.ellipse().position(2, 3).getAttribute("cy")).toBe("3");
  expect(SVG.ellipse().setPosition(2, 3).getAttribute("cx")).toBe("2");
  expect(SVG.ellipse().setPosition(2, 3).getAttribute("cy")).toBe("3");
  // incomplete info
  expect(SVG.ellipse().setRadius(5).getAttribute("rx")).toBe("5");
  // expect(SVG.ellipse().setRadius(5).getAttribute("ry")).toBe("");
});

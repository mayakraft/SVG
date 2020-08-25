const SVG = require("../svg");

test("rect", () => {
  const rect = SVG.rect(1,2,3,4);
  expect(rect.getAttribute("x")).toBe("3");
  expect(rect.getAttribute("y")).toBe("4");
  expect(rect.getAttribute("width")).toBe("1");
  expect(rect.getAttribute("height")).toBe("2");
});

test("rect, args, negative width height", () => {
  const rect = SVG.rect(-300, -200, 300, 200);
  expect(rect.getAttribute("x")).toBe("0");
  expect(rect.getAttribute("y")).toBe("0");
  expect(rect.getAttribute("width")).toBe("300");
  expect(rect.getAttribute("height")).toBe("200");
  const rect2 = SVG.rect(-320, -220, 300, 200);
  expect(rect2.getAttribute("x")).toBe("-20");
  expect(rect2.getAttribute("y")).toBe("-20");
  expect(rect2.getAttribute("width")).toBe("320");
  expect(rect2.getAttribute("height")).toBe("220");
});

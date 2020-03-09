const SVG = require("../svg");

test("custom id names", () => {
  ["clipPath", "symbol", "mask", "marker"].forEach(nodeName => {
    const svg = SVG();
    const test1 = svg[nodeName]();
    const test2 = svg[nodeName]("what is");
    expect(test1.getAttribute("id").length).toBe(5);
    expect(test2.getAttribute("id")).toBe("what is");

  })
});

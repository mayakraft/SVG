const fs = require("fs");
const SVG = require("../svg");

const path = "./tests/dragon.svg";

const testSVG = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
<circle cx="150" cy="75" r="75"/>
</svg>`;

test("async using fs", (done) => {
  const svg = SVG();
  fs.readFile(path, {encoding: "utf8"}, (err, data) => {
    svg.load(data);
    const polyline = Array.from(svg.childNodes)
      .filter(a => a.nodeName === "polyline")
      .shift();
    expect(polyline !== undefined).toBe(true);
    done();
  });
});

test("async attempt with node", () => {
  const svg = SVG();
  svg.load(path);
  expect(svg.childNodes.length).toBe(0);
});

test("sync", () => {
  const svg = SVG();
  svg.load(testSVG);
  const circle = Array.from(svg.childNodes)
    .filter(a => a.nodeName === "circle")
    .shift();

  expect(circle !== undefined).toBe(true);
});

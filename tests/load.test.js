const fs = require("fs");
const SVG = require("../svg");

const path = "./tests/dragon.svg";

test("async", (done) => {
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

test("async", (done) => {
  const svg = SVG();
  svg.load(path);
  expect(svg.childNodes.length).toBe(0);
});

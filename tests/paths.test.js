const SVG = require("../svg");

test("path", () => {
  const p = SVG.path();
  p.Move(20, 20);
  expect(p.getAttribute("d")).toBe("M20 20");
  p.line(50, 50);
  expect(p.getAttribute("d")).toBe("M20 20l50 50");
  p.vertical(30);
  expect(p.getAttribute("d")).toBe("M20 20l50 50v30");
  p.Curve(50, 0, 0, 50, 10, 10);
  expect(p.getAttribute("d")).toBe("M20 20l50 50v30C50 0 0 50 10 10");
  p.clear();
  // specification around getAttribute when it doesn't exist is "" or null
  const clearedD = p.getAttribute("d");
  expect(clearedD === "" || clearedD === null).toBe(true);
})

// test("bezier", () => {
//   let bez = SVG.bezier(0, 0, 25, 75, 75, 25, 100, 100);
//   const d = Array.from(bez.attributes).filter(a => a.nodeName === "d").shift();
//   expect(d.nodeValue).toBe("M 0,0 C 25,75 75,25 100,100");
//   bez.setBezier(0, 0, 100, 0, 100, 100, 0, 100);
//   const d2 = Array.from(bez.attributes).filter(a => a.nodeName === "d").shift();
//   expect(d2.nodeValue).toBe("M 0,0 C 100,0 100,100 0,100");
//   expect(true).toBe(true);
// });

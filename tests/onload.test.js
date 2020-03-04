const SVG = require("../svg");

test("import", done => {
  SVG(400, 400, (svg) => {
    done();
  })
});

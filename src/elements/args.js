const prepare = function (tagName, ...a) {
  switch (tagName) {
    case "line": return a;
  }
  return a;
};

const map = {
  line: ["x1", "y1", "x2", "y2"],
  rect: ["x", "y", "width", "height"],
  circle: ["cx", "cy", "r"],
  ellipse: ["cx", "cy", "rx", "ry"],
};

const args = function (element, tagName, ...a) {
  const keys = map[tagName];
  if (keys === undefined) { return; }
  const values = prepare(tagName, ...a);
  keys.forEach((key, i) => {
    if (values[i] != null) {
      element.setAttribute(key, values[i]);
    }
  })
};

export default args;

/**
 * convert all user-supplied arguments into a flat array
 * to match the expected arguments ordered in "map"
 */
const toArray = function (nodeName, ...a) {
  switch (nodeName) {
    case "line": return a;
  }
  return a;
};

const map = {
  line: ["x1", "y1", "x2", "y2"],
  rect: ["x", "y", "width", "height"],
  circle: ["cx", "cy", "r"],
  ellipse: ["cx", "cy", "rx", "ry"],
  polygon: ["points"],
  polyline: ["points"],
  path: ["d"],
  text: [undefined, "x", "y"],
};
delete map.text[0];

const args = function (element, ...a) {
  const nodeName = element.nodeName;
  const keys = map[nodeName];
  if (keys === undefined) { return element; }
  const values = toArray(nodeName, ...a);
  keys.forEach((key, i) => {
    if (values[i] != null) {
      element.setAttribute(key, values[i]);
    }
  });
  return element;
};

export default args;

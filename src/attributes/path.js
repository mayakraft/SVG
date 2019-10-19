const d = function (element) {
  let attr = element.getAttribute("d");
  if (attr == null) { attr = ""; }
  return attr;
};

const append = function (element, command, ...args) {
  const params = args.join(",");
  element.setAttribute("d", `${d(element)}${command}${params}`);
};

export const moveTo = function (element, x, y, relative = false) {
  append(element, relative ? "m" : "M", x, y);
  return element;
};

export const lineTo = function (element, x, y, relative = false) {
  append(element, relative ? "l" : "L", x, y);
  return element;
};

export const verticalLineTo = function (element, y, relative = false) {
  append(element, relative ? "v" : "V", y);
  return element;
};

export const horizontalLineTo = function (element, x, relative = false) {
  append(element, relative ? "h" : "H", x);
  return element;
};

export const smoothTo = function (element, c1x, c1y, x, y, relative = false) {
  append(element, relative ? "s" : "S", c1x, c1y, x, y);
  return element;
};

export const curveTo = function (element, c1x, c1y, c2x, c2y, x, y, relative = false) {
  append(element, relative ? "c" : "C", c1x, c1y, c2x, c2y, x, y);
  return element;
};

export const close = function (element) {
  append(element, "Z");
  return element;
};

// export const clear = function (element) {
//   element.setAttribute("d", "");
//   return element;
// }


[ { code:'M', command:'moveto', x:3, y:7 },
  { code:'L', command:'lineto', x:5, y:-6 },
  { code:'L', command:'lineto', x:1, y:7 },
  { code:'L', command:'lineto', x:100, y:-0.4 },
  { code:'m', command:'moveto', relative:true, x:-10, y:10 },
  { code:'l', command:'lineto', relative:true, x:10, y:0 },
  { code:'V', command:'vertical lineto', y:27 },
  { code:'V', command:'vertical lineto', y:89 },
  { code:'H', command:'horizontal lineto', x:23 },
  { code:'v', command:'vertical lineto', relative:true, y:10 },
  { code:'h', command:'horizontal lineto', relative:true, x:10 },
  { code:'C', command:'curveto', x1:33, y1:43, x2:38, y2:47, x:43, y:47 },
  { code:'c', command:'curveto', relative:true, x1:0, y1:5, x2:5, y2:10, x:10, y:10 },
  { code:'S', command:'smooth curveto', x2:63, y2:67, x:63, y:67 },
  { code:'s', command:'smooth curveto', relative:true, x2:-10, y2:10, x:10, y:10 },
  { code:'Q', command:'quadratic curveto', x1:50, y1:50, x:73, y:57 },
  { code:'q', command:'quadratic curveto', relative:true, x1:20, y1:-5, x:0, y:-10 },
  { code:'T', command:'smooth quadratic curveto', x:70, y:40 },
  { code:'t', command:'smooth quadratic curveto', relative:true, x:0, y:-15 },
  { code:'A', command:'elliptical arc', rx:5, ry:5, xAxisRotation:45, largeArc:true, sweep:false, x:40, y:20 },
  { code:'a', command:'elliptical arc', relative:true, rx:5, ry:5, xAxisRotation:20, largeArc:false, sweep:true, x:-10, y:-10 },
  { code:'Z', command:'closepath' } ]


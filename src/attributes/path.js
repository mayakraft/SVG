
const is_iterable = obj => obj != null
  && typeof obj[Symbol.iterator] === "function";

const flatten_input = function (...args) {
  switch (args.length) {
    case undefined:
    case 0: return args;
    // only if its an array (is iterable) and NOT a string
    case 1: return is_iterable(args[0]) && typeof args[0] !== "string"
      ? flatten_input(...args[0])
      : [args[0]];
    default:
      return Array.from(args)
        .map(a => (is_iterable(a)
          ? [...flatten_input(a)]
          : a))
        .reduce((a, b) => a.concat(b), []);
  }
};

const d = function (element) {
  let attr = element.getAttribute("d");
  if (attr == null) { attr = ""; }
  return attr;
};

const append = function (element, command, ...args) {
  const params = flatten_input(args).join(",");
  element.setAttribute("d", `${d(element)}${command}${params}`);
  return element;
};

export const command = (element, cmd, ...args) => append(element, cmd, ...args);

export const moveTo = (element, ...args) => append(element, "M", ...args);
export const _moveTo = (element, ...args) => append(element, "m", ...args);
export const lineTo = (element, ...args) => append(element, "L", ...args);
export const _lineTo = (element, ...args) => append(element, "l", ...args);
export const verticalLineTo = (element, y) => append(element, "V", y);
export const _verticalLineTo = (element, y) => append(element, "v", y);
export const horizontalLineTo = (element, x) => append(element, "H", x);
export const _horizontalLineTo = (element, x) => append(element, "h", x);
export const smoothTo = (element, ...args) => append(element, "S", ...args);
export const _smoothTo = (element, ...args) => append(element, "s", ...args);
export const curveTo = (element, ...args) => append(element, "C", ...args);
export const _curveTo = (element, ...args) => append(element, "c", ...args);
export const close = element => append(element, "Z");
export const clear = (element) => {
  element.setAttribute("d", "");
  return element;
};

// { code:'C', b:'curveto', x1:33, y1:43, x2:38, y2:47, x:43, y:47 },
// { code:'c', b:'curveto', relative:true, x1:0, y1:5, x2:5, y2:10, x:10, y:10 },
// { code:'S', b:'smooth curveto', x2:63, y2:67, x:63, y:67 },
// { code:'s', b:'smooth curveto', relative:true, x2:-10, y2:10, x:10, y:10 },
// { code:'Q', b:'quadratic curveto', x1:50, y1:50, x:73, y:57 },
// { code:'q', b:'quadratic curveto', relative:true, x1:20, y1:-5, x:0, y:-10 },
// { code:'T', b:'smooth quadratic curveto', x:70, y:40 },
// { code:'t', b:'smooth quadratic curveto', relative:true, x:0, y:-15 },
// { code:'A', b:'elliptical arc', rx:5, ry:5, xAxisRotation:45, largeArc:true, sweep:false, x:40, y:20 },
// { code:'a', b:'elliptical arc', relative:true, rx:5, ry:5, xAxisRotation:20, largeArc:false, sweep:true, x:-10, y:-10 },
// { code:'Z', b:'closepath' }


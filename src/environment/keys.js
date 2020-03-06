/**
 * SVG (c) Robby Kraft
 */

// frequently-used words
const keys = [
  "number",
  "object",
  "transform",
  "class",
  "style",
  "function",
  "string",
  "undefined",
  "boolean",
  "path",
  "svg",
  "id",
];

const map = {};

keys.forEach(key => map[key] = key);

export default map;

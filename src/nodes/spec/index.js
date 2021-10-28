/**
 * SVG (c) Robby Kraft
 */
import svgDef from "./svg/index";
import gDef from "./g";
import circleDef from "./circle";
import ellipseDef from "./ellipse";
import lineDef from "./line";
import pathDef from "./path";
import rectDef from "./rect";
import styleDef from "./style";
import textDef from "./text";
// multiple nodes in one
import maskTypes from "./maskTypes";
import polyDefs from "./polys";

/**
 * in each of these instances, arguments maps the arguments to attributes
 * as the attributes are listed in the "attributes" folder.
 *
 * arguments: function. this should convert the array of arguments into
 * an array of (processed) arguments. 1:1. arguments into arguments.
 * make sure it is returning an array.
 *
 */
export default Object.assign({},
  svgDef,
  gDef,
  circleDef,
  ellipseDef,
  lineDef,
  pathDef,
  rectDef,
  styleDef,
  textDef,
  // multiple
  maskTypes,
  polyDefs,
);

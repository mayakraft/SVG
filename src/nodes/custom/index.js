/**
 * SVG (c) Kraft
 */
/**
 * This is the entry-point for adding new primitives to the library.
 * you have to define how the arguments are sorted (a, b, c)...
 *
 * 1. create and fill a folder just like the examples in this directory
 * 2. hook up the new primitive inside this file
 * 3. add the name to the list of drawing inside "nodeNames.js"
 */
import Arc from "./arc/index";
import Wedge from "./wedge/index";
import Parabola from "./parabola/index";
import RegularPolygon from "./regularPolygon/index";
import RoundRect from "./roundRect/index";
import Arrow from "./arrow/index";
import Curve from "./curve/index";

const nodes = {};

Object.assign(
	nodes,
	// to include/exclude nodes from this library
	// comment out nodes below, rebuild
	Arc,
	Wedge,
	Parabola,
	RegularPolygon,
	RoundRect,
	Arrow,
	Curve,
);

export default nodes;

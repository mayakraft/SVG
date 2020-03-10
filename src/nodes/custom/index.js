/**
 * SVG (c) Robby Kraft
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

const nodes = {};

// to remove custom nodes from the library:
// comment out this block below and rebuild

[Arc, Wedge, Parabola, RegularPolygon, RoundRect,
// Arrow
].forEach(custom => {
  nodes[custom.name] = {
    tagName: custom.tagName,
    arguments: custom.arguments,
    methods: custom.methods,
  };
});

export default nodes;

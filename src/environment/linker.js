/**
 * SVG (c) Robby Kraft
 */
import Nodes from "../nodes/nodes";
import Constructor from "../nodes/constructor";
import NodesChildren from "../nodes/nodesChildren";

const link_rabbitear = (svg, ear) => {
	// give all primitives a .svg() method that turns them into a <path>
  ear.svg = svg;
  const keys = [
    // "vector",
    // "line",
    // "ray",
    "segment",
    "circle",
    "ellipse",
    "rect",
    "polygon",
    // "matrix",
    // "plane",
  ];
  keys.filter(key => ear[key] && ear[key].prototype)
    .forEach((key) => {
      ear[key].prototype.svg = function () { return svg.path(this.svgPath()); };
    });

	// convert a FOLD graph to an svg element
	// create a new svg element "graph", which is really a <g>
	Nodes.graph = {
  	nodeName: "g",
  	init: function (element, graph, options = {}) {
			ear.graph.svg(graph, { ...options, parent: element });
			return element;
		},
  	args: () => [],
  	methods: Nodes.g.methods,
  	attributes: Nodes.g.attributes,
	};
	// give "graph" the ability to act like a <g> and create children like <line>
	NodesChildren.graph = [...NodesChildren.g];
	// <svg> and <g> can call .graph() and it is appended as a child
	NodesChildren.svg.push("graph");
	NodesChildren.g.push("graph");
	// svg.graph = function () { return Constructor("graph", ...arguments); };

};

// link this library to be a part of the larger library
const Linker = function (lib) {
	// is the library Rabbit Ear?
	if (lib.graph && lib.origami) {
		link_rabbitear(this, lib);
	}
};

export default Linker;


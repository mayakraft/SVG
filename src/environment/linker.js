/**
 * SVG (c) Kraft
 */
import Nodes from "../nodes/nodes";
import Constructor from "../nodes/constructor";
import NodesChildren from "../nodes/nodesChildren";
import libraries from "./libraries";
/**
 * The purpose of this section is to implant this library to become
 * one small part of a larger library. This requires knowing about
 * the larger library, for now, the linking is hard-coded to Rabbit Ear.
 */
const link_rabbitear_math = (svg, ear) => {
	// give all primitives a .svg() method that turns them into a <path>
	// ignoring primitives: "vector", "line", "ray", "matrix", "plane"
	[ "segment",
		"circle",
		"ellipse",
		"rect",
		"polygon",
	].filter(key => ear[key] && ear[key].prototype)
		.forEach((key) => {
			ear[key].prototype.svg = function () { return svg.path(this.svgPath()); };
		});

	// bind the other way. allow SVG library to return vector() objects,
	// as in the onMove function, the location of the pointer.
	libraries.math.vector = ear.vector;
};

// create a new svg element "origami", which is really a <svg>
const link_rabbitear_graph = (svg, ear) => {
	// register this node name as a drawable element with the library.
	const NODE_NAME = "origami";
	// actual drawing methods are contained in Rabbit Ear under "ear.graph.svg"
	Nodes[NODE_NAME] = {
		nodeName: "g",
		init: function (element, ...args) {
			return ear.graph.svg.drawInto(element, ...args);
		},
		args: () => [],
		methods: Nodes.g.methods,
		attributes: Nodes.g.attributes,
		static: {},
	};
	Object.keys(ear.graph.svg).forEach(key => {
		Nodes[NODE_NAME].static[key] = (element, ...args) => {
			const child = ear.graph.svg[key](...args);
			element.appendChild(child);
			return child;
		}
	});
	// give "origami" the ability to act like a <svg> and create children, like <line>
	NodesChildren[NODE_NAME] = [...NodesChildren.g];
	// <svg> and <g> can call .origami() and it is appended as a child
	NodesChildren.svg.push(NODE_NAME);
	NodesChildren.g.push(NODE_NAME);
	// this sets a constructor as a child of the library itself: ear.svg.origami()
	// as well as the static methods: ear.svg.origami.edges() / faces()...
	// 'boundaries', 'faces', 'edges', 'vertices', 'drawInto', 'getViewBox'
	svg[NODE_NAME] = (...args) => Constructor(NODE_NAME, null, ...args);
	Object.keys(ear.graph.svg).forEach(key => {
		svg[NODE_NAME][key] = ear.graph.svg[key];
	});
};

// link this library to be a part of the larger library
const Linker = function (lib) {
	// is the library a familiar library?
	// Rabbit Ear?
	// todo: what is the best way to uniquely identify Rabbit Ear.
	if (lib.graph && lib.origami) {
		lib.svg = this;
		link_rabbitear_math(this, lib);
		link_rabbitear_graph(this, lib);
	} else {
		// console.warn("bad link", lib);
	}
};

export default Linker;

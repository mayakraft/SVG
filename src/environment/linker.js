/**
 * SVG (c) Robby Kraft
 */
import Nodes from "../nodes/nodes";
import Constructor from "../nodes/constructor";
import NodesChildren from "../nodes/nodesChildren";
/**
 * The purpose of this section is to implant this library to become
 * one small part of a larger library. This requires knowing about
 * the larger library, for now, the linking is hard-coded to Rabbit Ear.
 */
const link_rabbitear_math = (svg, ear) => {
  // give all primitives a .svg() method that turns them into a <path>
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
};

// create a new svg element "origami", which is really a <svg>
const link_rabbitear_graph = (svg, ear) => {
  // register this node name as a drawable element with the library.
  const NODE_NAME = "origami";
  // actual drawing methods are contained in Rabbit Ear under "ear.graph.svg"
  Nodes[NODE_NAME] = {
    nodeName: "svg",
    init: function (element, ...args) {
      return ear.graph.svg.drawInto(element, ...args);
    },
    args: () => [],
    methods: Nodes.svg.methods,
    attributes: Nodes.svg.attributes,
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
  NodesChildren[NODE_NAME] = [...NodesChildren.svg];
  // <svg> and <g> can call .origami() and it is appended as a child
  NodesChildren.svg.push(NODE_NAME);
  NodesChildren.g.push(NODE_NAME);
  // this sets a constructor as a child of the library itself.
  // as well as the static methods
  svg[NODE_NAME] = (...args) => Constructor(NODE_NAME, ...args);
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

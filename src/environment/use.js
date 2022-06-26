/**
* SVG (c) Kraft
*/
/*
import * as S from "./strings";
import libraries from "./libraries";
import NODES from "../nodes/nodes";

const bindRabbitEar = (_this, library) => {
	libraries.math.vector = library.vector;
};


// const possibleFoldObject = (object) => {
//   if (typeof object !== S.str_object) { return false; }
//   const foldKeys = ["vertices_coords", "edges_vertices", "faces_vertices", "faces_edges"];
//   return Object.keys(object)
//     .map(key => foldKeys.includes(key))
//     .reduce((a, b) => a || b, false);
// };

// const getFoldObject = (array) => array
//   .filter(a => possibleFoldObject(a))
//   .shift();

// const bindFoldToSvg = (_this, library) => {
//   const oldInit = NODES.svg.init;
//   NODES.svg.init = function (element, ...args) {
//     // get the input from a string or an object
//     // const graph = getstr_object(arg);
//     const foldstr_object = getFoldObject(args);
//     if (foldstr_object) {
//       // options
//       const options = library.options(...args);
//       // render
//       library.render_intostr_svg(element, foldstr_object, options);
//       // return
//       // return element;
//     }
//     // const foldSVG = library(getFoldObject(args), { output: "svg" });
//     // const foldSVG = library.render_components(...args);
//     // if (foldSVG && foldSVG.childNodes) {
//     //   Array.from(foldSVG.childNodes).forEach(g => element.appendChild(g));
//     //   Array.from(foldSVG.attributes)
//     //     .forEach(attr => element.setAttribute(attr.nodeName, attr.nodeValue));
//     // }
//     return oldInit(element, ...args);
//   }
// };


const use = function (library) {
	// check if this is the RabbitEar library
	if (library.origami) {
		bindRabbitEar(this, library);
	}
	// if (library.render_intostr_svg) {
	// 	bindFoldToSvg(this, library);
	// }
};

export default use;
*/

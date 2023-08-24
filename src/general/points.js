// /**
//  * SVG (c) Kraft
//  */
// import flatten from "../arguments/flatten";
// import coordinates from "../arguments/coordinates";
// import attributes from "../attributes/singleElements";

// // todo: this is not actually used anywhere

// const pointsString = function () {
// 	return Array.from(Array(Math.floor(arguments.length / 2)))
// 		.map((_, i) => `${arguments[i * 2]},${arguments[i * 2 + 1]}`).join(" ");
// };

// const polys = {
// 	setPoints: {
// 		attr: attributes.polyline.slice(0, 1),
// 		f: (...args) => pointsString(...coordinates(...flatten(...args))),
// 	},
// };

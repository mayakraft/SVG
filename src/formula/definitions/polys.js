/**
 * SVG (c) Kraft
 */
import * as S from "../../environment/strings.js";
import semiFlattenArrays from "../../arguments/semiFlattenArrays.js";
import makeCoordinates from "../../arguments/makeCoordinates.js";

const getPoints = (el) => {
	const attr = el.getAttribute(S.str_points);
	return (attr == null) ? "" : attr;
};

const polyString = function () {
	return Array
		.from(Array(Math.floor(arguments.length / 2)))
		.map((_, i) => `${arguments[i * 2 + 0]},${arguments[i * 2 + 1]}`)
		.join(" ");
};

const stringifyArgs = (...args) => [
	polyString(...makeCoordinates(...semiFlattenArrays(...args))),
];

const setPoints = (element, ...args) => {
	element.setAttribute(S.str_points, stringifyArgs(...args)[0]);
	return element;
};

const addPoint = (element, ...args) => {
	element.setAttribute(S.str_points, [getPoints(element), stringifyArgs(...args)[0]]
		.filter(a => a !== "")
		.join(" "));
	return element;
};

// this should be improved
// right now the special case is if there is only 1 argument and it's a string
// it should be able to take strings or numbers at any point,
// converting the strings to coordinates
const Args = function (...args) {
	return args.length === 1 && typeof args[0] === S.str_string
		? [args[0]]
		: stringifyArgs(...args);
};

export default {
	polyline: {
		args: Args,
		methods: {
			setPoints,
			addPoint,
		},
	},
	polygon: {
		args: Args,
		methods: {
			setPoints,
			addPoint,
		},
	},
};

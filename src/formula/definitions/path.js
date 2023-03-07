/**
 * SVG (c) Kraft
 */
import {
	pathCommandNames,
	parsePathCommands,
} from "../../methods/path.js";
/**
 * @param {SVGElement} one svg element, intended to be a <path> element
 * @returns {string} the "d" attribute, or if unset, returns an empty string "".
 */
const getD = (el) => {
	const attr = el.getAttribute("d");
	return (attr == null) ? "" : attr;
};

const clear = element => {
	element.removeAttribute("d");
	return element;
};

// todo: would be great if for arguments > 2 it alternated space and comma
const appendPathCommand = (el, command, ...args) => {
	el.setAttribute("d", `${getD(el)}${command}${args.flat().join(" ")}`);
	return el;
};

const appendPathString = (el, string) => {
	el.setAttribute("d", `${getD(el)}${string}`);
	return el;
};

// user got the commands object and is returning it to us
// const setPathCommands = (element, commandsObject) => commandsObject
//   .forEach(el => appendPathCommand(element, el.command, el.values));

// user provided one already-formatted path string
const setPathString = (element, commandsString) => {
	element.setAttribute("d", commandsString);
	return element;
};

// break out the path commands into an array of descriptive objects
const getCommands = element => parsePathCommands(getD(element));

// const setters = {
//   string: setPathString,
//   object: setPathCommands,
// };
// const appenders = {
//   string: appendPathString,
//   object: appendPathCommands,
// };

// depending on the user's argument, different setters will get called
// const noClearSet = (element, ...args) => {
//   if (args.length === 1) {
//     const typ = typeof args[0];
//     if (setters[typ]) {
//       setters[typ](element, args[0]);
//     }
//   }
// };

// const clearAndSet = (element, ...args) => {
//   if (args.length === 1) {
//     const typ = typeof args[0];
//     if (setters[typ]) {
//       clear(element);
//       setters[typ](element, args[0]);
//     }
//   }
// };

const path_methods = {
	addCommand: appendPathCommand,
	appendCommand: appendPathCommand,
	clear,
	getCommands: getCommands,
	get: getCommands,
	getD: el => el.getAttribute("d"),
	// set: clearAndSet,
	// add: noClearSet,
};

Object.keys(pathCommandNames).forEach((key) => {
	path_methods[pathCommandNames[key]] = (el, ...args) => appendPathCommand(el, key, ...args);
});

export default {
	path: {
		methods: path_methods,
	},
};

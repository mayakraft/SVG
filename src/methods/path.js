/**
 * SVG (c) Kraft
 */
const markerRegEx = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g;
const digitRegEx = /-?[0-9]*\.?\d+/g;

export const pathCommandNames = {
	m: "move",
	l: "line",
	v: "vertical",
	h: "horizontal",
	a: "ellipse",
	c: "curve",
	s: "smoothCurve",
	q: "quadCurve",
	t: "smoothQuadCurve",
	z: "close",
};
// make capitalized copies of each command
Object.keys(pathCommandNames).forEach((key) => {
	const s = pathCommandNames[key];
	pathCommandNames[key.toUpperCase()] = s.charAt(0).toUpperCase() + s.slice(1);
});
/**
 * if the command is relative, it will build upon offset coordinate
 */
const add2path = (a, b) => [a[0] + (b[0] || 0), a[1] + (b[1] || 0)];
const getEndpoint = (command, values, offset = [0, 0]) => {
	const upper = command.toUpperCase();
	const origin = command === upper ? [0, 0] : offset;
	switch (upper) {
	case "M":
	case "L":
	case "V":
	case "H":
	case "T": return add2path(origin, values);
	case "A": return add2path(origin, [values[5], values[6]]);
	case "C": return add2path(origin, [values[4], values[5]]);
	case "S":
	case "Q": return add2path(origin, [values[2], values[3]]);
	case "Z": return undefined; // cannot be set locally.
	default: return origin;
	}
};

/**
 * @description Parse a path "d" attribute into an array of objects,
 * where each object contains a command, and the numerical values.
 * @param {string} d the "d" attribute of a path.
 */
export const parsePathCommands = (d) => {
	const results = [];
	let match;
	while ((match = markerRegEx.exec(d)) !== null) {
		results.push(match);
	}
	return results
		.map((result, i, arr) => [
			result[0],
			result.index,
			i === arr.length - 1
				? d.length - 1
				: arr[(i + 1) % arr.length].index - 1,
		])
		.map(el => {
			const command = el[0];
			const valueString = d.substring(el[1] + 1, el[2]);
			const strings = valueString.match(digitRegEx);
			const values = strings ? strings.map(parseFloat) : [];
			return { command, values };
		});
};

export const parsePathCommandsWithEndpoints = (d) => {
	let pen = [0, 0];
	const commands = parsePathCommands(d);
	if (!commands.length) { return commands; }
	commands.forEach((command, i) => {
		commands[i].end = getEndpoint(command.command, command.values, pen);
		commands[i].start = i === 0 ? pen : commands[i - 1].end;
		pen = commands[i].end;
	});
	const last = commands[commands.length - 1];
	const firstDrawCommand = commands
		.filter(el => el.command.toUpperCase() !== "M"
			&& el.command.toUpperCase() !== "Z")
		.shift();
	if (last.command.toUpperCase() === "Z") {
		last.end = [...firstDrawCommand.start];
	}
	return commands;
};

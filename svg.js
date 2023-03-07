/* svg (c) Kraft, MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.svg = factory());
})(this, (function () { 'use strict';

	var NS = "http://www.w3.org/2000/svg";

	const toCamel = (s) => s
		.replace(/([-_][a-z])/ig, $1 => $1
			.toUpperCase()
			.replace("-", "")
			.replace("_", ""));
	const toKebab = (s) => s
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
		.toLowerCase();
	const capitalized = (s) => s
		.charAt(0).toUpperCase() + s.slice(1);

	var transformCase = /*#__PURE__*/Object.freeze({
		__proto__: null,
		capitalized: capitalized,
		toCamel: toCamel,
		toKebab: toKebab
	});

	const str_class = "class";
	const str_function = "function";
	const str_undefined = "undefined";
	const str_number = "number";
	const str_string = "string";
	const str_object = "object";
	const str_svg = "svg";
	const str_id = "id";
	const str_style = "style";
	const str_viewBox = "viewBox";
	const str_transform = "transform";
	const str_points = "points";
	const str_stroke = "stroke";
	const str_fill = "fill";
	const str_none = "none";

	const makeCoordinates = (...args) => args
		.filter(a => typeof a === str_number)
		.concat(args
			.filter(a => typeof a === str_object && a !== null)
			.map((el) => {
				if (typeof el.x === str_number) { return [el.x, el.y]; }
				if (typeof el[0] === str_number) { return [el[0], el[1]]; }
				return undefined;
			}).filter(a => a !== undefined)
			.reduce((a, b) => a.concat(b), []));

	const makeUUID = () => Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, "")
		.concat("aaaaa")
		.substr(0, 5);

	const viewBoxValuesToString = function (x, y, width, height, padding = 0) {
		const scale = 1.0;
		const d = (width / scale) - width;
		const X = (x - d) - padding;
		const Y = (y - d) - padding;
		const W = (width + d * 2) + padding * 2;
		const H = (height + d * 2) + padding * 2;
		return [X, Y, W, H].join(" ");
	};
	const makeViewBox = (...args) => {
		const numbers = makeCoordinates(...args.flat());
		if (numbers.length === 2) { numbers.unshift(0, 0); }
		return numbers.length === 4 ? viewBoxValuesToString(...numbers) : undefined;
	};

	var argumentMethods = {
		...transformCase,
		makeCoordinates,
		makeUUID,
		makeViewBox,
	};

	const svg_add2 = (a, b) => [a[0] + b[0], a[1] + b[1]];
	const svg_sub2 = (a, b) => [a[0] - b[0], a[1] - b[1]];
	const svg_scale2 = (a, s) => [a[0] * s, a[1] * s];
	const svg_magnitudeSq2 = (a) => (a[0] ** 2) + (a[1] ** 2);
	const svg_magnitude2 = (a) => Math.sqrt(svg_magnitudeSq2(a));
	const svg_distanceSq2 = (a, b) => svg_magnitudeSq2(svg_sub2(a, b));
	const svg_distance2 = (a, b) => Math.sqrt(svg_distanceSq2(a, b));
	const svg_polar_to_cart = (a, d) => [Math.cos(a) * d, Math.sin(a) * d];

	var svgMath = /*#__PURE__*/Object.freeze({
		__proto__: null,
		svg_add2: svg_add2,
		svg_distance2: svg_distance2,
		svg_distanceSq2: svg_distanceSq2,
		svg_magnitude2: svg_magnitude2,
		svg_magnitudeSq2: svg_magnitudeSq2,
		svg_polar_to_cart: svg_polar_to_cart,
		svg_scale2: svg_scale2,
		svg_sub2: svg_sub2
	});

	const removeChildren = (element) => {
		while (element.lastChild) {
			element.removeChild(element.lastChild);
		}
		return element;
	};
	const appendTo = (element, parent) => {
		if (parent && parent.appendChild) {
			parent.appendChild(element);
		}
		return element;
	};
	const setAttributes = (element, attrs) => Object.keys(attrs)
		.forEach(key => element.setAttribute(toKebab(key), attrs[key]));
	const clearSVG = (element) => {
		Array.from(element.attributes)
			.filter(a => a !== "xmlns")
			.forEach(attr => element.removeAttribute(attr.name));
		return removeChildren(element);
	};

	var dom = /*#__PURE__*/Object.freeze({
		__proto__: null,
		appendTo: appendTo,
		clearSVG: clearSVG,
		removeChildren: removeChildren,
		setAttributes: setAttributes
	});

	const isBrowser = typeof window !== str_undefined
		&& typeof window.document !== str_undefined;
	typeof process !== str_undefined
		&& process.versions != null
		&& process.versions.node != null;

	var Messages = {
		window: "window not set; if using node/deno include package @xmldom/xmldom and set ear.window = xmldom",
	};

	const svgWindowContainer = { window: undefined };
	if (isBrowser) { svgWindowContainer.window = window; }
	const SVGWindow = () => {
		if (svgWindowContainer.window === undefined) {
			throw Messages.window;
		}
		return svgWindowContainer.window;
	};

	const makeCDATASection = (text) => (new (SVGWindow()).DOMParser())
		.parseFromString("<root></root>", "text/xml")
		.createCDATASection(text);

	const markerRegEx = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g;
	const digitRegEx = /-?[0-9]*\.?\d+/g;
	const pathCommandNames = {
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
	Object.keys(pathCommandNames).forEach((key) => {
		const s = pathCommandNames[key];
		pathCommandNames[key.toUpperCase()] = s.charAt(0).toUpperCase() + s.slice(1);
	});
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
		case "Z": return undefined;
		default: return origin;
		}
	};
	const parsePathCommands = (d) => {
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
	const parsePathCommandsWithEndpoints = (d) => {
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

	var pathMethods = /*#__PURE__*/Object.freeze({
		__proto__: null,
		parsePathCommands: parsePathCommands,
		parsePathCommandsWithEndpoints: parsePathCommandsWithEndpoints,
		pathCommandNames: pathCommandNames
	});

	const getAttr = (element) => {
		const t = element.getAttribute(str_transform);
		return (t == null || t === "") ? undefined : t;
	};
	const TransformMethods = {
		clearTransform: (el) => { el.removeAttribute(str_transform); return el; },
	};
	["translate", "rotate", "scale", "matrix"].forEach(key => {
		TransformMethods[key] = (element, ...args) => element.setAttribute(
			str_transform,
			[getAttr(element), `${key}(${args.join(" ")})`]
				.filter(a => a !== undefined)
				.join(" "),
		);
	});

	const setViewBox = (element, ...args) => {
		const viewBox = args.length === 1 && typeof args[0] === str_string
			? args[0]
			: makeViewBox(...args);
		if (viewBox) {
			element.setAttribute(str_viewBox, viewBox);
		}
		return element;
	};
	const getViewBox = function (element) {
		const vb = element.getAttribute(str_viewBox);
		return (vb == null
			? undefined
			: vb.split(" ").map(n => parseFloat(n)));
	};
	const convertToViewBox = function (svg, x, y) {
		const pt = svg.createSVGPoint();
		pt.x = x;
		pt.y = y;
		const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
		return [svgPoint.x, svgPoint.y];
	};

	var viewBox = /*#__PURE__*/Object.freeze({
		__proto__: null,
		convertToViewBox: convertToViewBox,
		getViewBox: getViewBox,
		setViewBox: setViewBox
	});

	var methods$1 = {
		...svgMath,
		...dom,
		makeCDATASection,
		...pathMethods,
		...TransformMethods,
		...viewBox,
	};

	const getFrame = function (element) {
		const viewBox = getViewBox(element);
		if (viewBox !== undefined) {
			return viewBox;
		}
		if (typeof element.getBoundingClientRect === str_function) {
			const rr = element.getBoundingClientRect();
			return [rr.x, rr.y, rr.width, rr.height];
		}
		return [];
	};
	const setPadding = function (element, padding) {
		const viewBox = getViewBox(element);
		if (viewBox !== undefined) {
			setViewBox(element, ...[-padding, -padding, padding * 2, padding * 2]
				.map((nudge, i) => viewBox[i] + nudge));
		}
		return element;
	};
	const bgClass = "svg-background-rectangle";
	const background = function (element, color) {
		let backRect = Array.from(element.childNodes)
			.filter(child => child.getAttribute(str_class) === bgClass)
			.shift();
		if (backRect == null) {
			backRect = this.Constructor("rect", null, ...getFrame(element));
			backRect.setAttribute(str_class, bgClass);
			backRect.setAttribute(str_stroke, str_none);
			element.insertBefore(backRect, element.firstChild);
		}
		backRect.setAttribute(str_fill, color);
		return element;
	};
	const findStyleSheet = function (element) {
		const styles = element.getElementsByTagName(str_style);
		return styles.length === 0 ? undefined : styles[0];
	};
	const stylesheet = function (element, textContent) {
		let styleSection = findStyleSheet(element);
		if (styleSection == null) {
			styleSection = this.Constructor(str_style);
			element.insertBefore(styleSection, element.firstChild);
		}
		styleSection.textContent = "";
		styleSection.appendChild(makeCDATASection(textContent));
		return styleSection;
	};
	var methods = {
		size: setViewBox,
		setViewBox,
		getViewBox,
		padding: setPadding,
		background,
		getWidth: el => getFrame(el)[2],
		getHeight: el => getFrame(el)[3],
		stylesheet: function (el, text) { return stylesheet.call(this, el, text); },
	};

	var svgDef = {
		svg: {
			args: (...args) => [makeViewBox(makeCoordinates(...args))].filter(a => a != null),
			methods,
			init: (element, ...args) => {
			},
		},
	};

	const loadGroup = (group, ...sources) => {
		return group;
	};
	var gDef = {
		g: {
			init: loadGroup,
			methods: {
				load: loadGroup,
			},
		},
	};

	const classes_nodes = {
		svg: [
			"svg",
		],
		defs: [
			"defs",
		],
		header: [
			"desc",
			"filter",
			"metadata",
			"style",
			"script",
			"title",
			"view",
		],
		cdata: [
			"cdata",
		],
		group: [
			"g",
		],
		visible: [
			"circle",
			"ellipse",
			"line",
			"path",
			"polygon",
			"polyline",
			"rect",
		],
		text: [
			"text",
		],
		invisible: [
			"marker",
			"symbol",
			"clipPath",
			"mask",
		],
		patterns: [
			"linearGradient",
			"radialGradient",
			"pattern",
		],
		childrenOfText: [
			"textPath",
			"tspan",
		],
		gradients: [
			"stop",
		],
		filter: [
			"feBlend",
			"feColorMatrix",
			"feComponentTransfer",
			"feComposite",
			"feConvolveMatrix",
			"feDiffuseLighting",
			"feDisplacementMap",
			"feDistantLight",
			"feDropShadow",
			"feFlood",
			"feFuncA",
			"feFuncB",
			"feFuncG",
			"feFuncR",
			"feGaussianBlur",
			"feImage",
			"feMerge",
			"feMergeNode",
			"feMorphology",
			"feOffset",
			"fePointLight",
			"feSpecularLighting",
			"feSpotLight",
			"feTile",
			"feTurbulence",
		],
	};

	const nodeNames = Object.values(classes_nodes).flat();

	const classes_attributes = {
		presentation: [
			"color",
			"color-interpolation",
			"cursor",
			"direction",
			"display",
			"fill",
			"fill-opacity",
			"fill-rule",
			"font-family",
			"font-size",
			"font-size-adjust",
			"font-stretch",
			"font-style",
			"font-variant",
			"font-weight",
			"image-rendering",
			"letter-spacing",
			"opacity",
			"overflow",
			"paint-order",
			"pointer-events",
			"preserveAspectRatio",
			"shape-rendering",
			"stroke",
			"stroke-dasharray",
			"stroke-dashoffset",
			"stroke-linecap",
			"stroke-linejoin",
			"stroke-miterlimit",
			"stroke-opacity",
			"stroke-width",
			"tabindex",
			"transform-origin",
			"user-select",
			"vector-effect",
			"visibility",
		],
		animation: [
			"accumulate",
			"additive",
			"attributeName",
			"begin",
			"by",
			"calcMode",
			"dur",
			"end",
			"from",
			"keyPoints",
			"keySplines",
			"keyTimes",
			"max",
			"min",
			"repeatCount",
			"repeatDur",
			"restart",
			"to",
			"values",
		],
		effects: [
			"azimuth",
			"baseFrequency",
			"bias",
			"color-interpolation-filters",
			"diffuseConstant",
			"divisor",
			"edgeMode",
			"elevation",
			"exponent",
			"filter",
			"filterRes",
			"filterUnits",
			"flood-color",
			"flood-opacity",
			"in",
			"in2",
			"intercept",
			"k1",
			"k2",
			"k3",
			"k4",
			"kernelMatrix",
			"lighting-color",
			"limitingConeAngle",
			"mode",
			"numOctaves",
			"operator",
			"order",
			"pointsAtX",
			"pointsAtY",
			"pointsAtZ",
			"preserveAlpha",
			"primitiveUnits",
			"radius",
			"result",
			"seed",
			"specularConstant",
			"specularExponent",
			"stdDeviation",
			"stitchTiles",
			"surfaceScale",
			"targetX",
			"targetY",
			"type",
			"xChannelSelector",
			"yChannelSelector",
		],
		text: [
			"dx",
			"dy",
			"alignment-baseline",
			"baseline-shift",
			"dominant-baseline",
			"lengthAdjust",
			"method",
			"overline-position",
			"overline-thickness",
			"rotate",
			"spacing",
			"startOffset",
			"strikethrough-position",
			"strikethrough-thickness",
			"text-anchor",
			"text-decoration",
			"text-rendering",
			"textLength",
			"underline-position",
			"underline-thickness",
			"word-spacing",
			"writing-mode",
		],
		gradient: [
			"gradientTransform",
			"gradientUnits",
			"spreadMethod",
		],
	};

	const nodes_attributes = {
		svg: [str_viewBox],
		line: ["x1", "y1", "x2", "y2"],
		rect: ["x", "y", "width", "height"],
		circle: ["cx", "cy", "r"],
		ellipse: ["cx", "cy", "rx", "ry"],
		polygon: [str_points],
		polyline: [str_points],
		path: ["d"],
		text: ["x", "y"],
		mask: [str_id],
		symbol: [str_id],
		clipPath: [str_id, "clip-rule"],
		marker: [
			str_id,
			"markerHeight",
			"markerUnits",
			"markerWidth",
			"orient",
			"refX",
			"refY",
		],
		linearGradient: ["x1", "x2", "y1", "y2"],
		radialGradient: ["cx", "cy", "r", "fr", "fx", "fy"],
		stop: ["offset", "stop-color", "stop-opacity"],
		pattern: ["patternContentUnits", "patternTransform", "patternUnits"],
	};
	nodeNames
		.filter(nodeName => !nodes_attributes[nodeName])
		.forEach(nodeName => { nodes_attributes[nodeName] = []; });
	const additionalNodeAttributes = [{
		nodes: [str_svg, "defs", "g"].concat(classes_nodes.visible, classes_nodes.text),
		attr: classes_attributes.presentation,
	}, {
		nodes: ["filter"],
		attr: classes_attributes.effects,
	}, {
		nodes: classes_nodes.childrenOfText.concat("text"),
		attr: classes_attributes.text,
	}, {
		nodes: classes_nodes.filter,
		attr: classes_attributes.effects,
	}, {
		nodes: classes_nodes.gradients,
		attr: classes_attributes.gradient,
	}];
	additionalNodeAttributes
		.forEach(el => el.nodes
			.forEach(nodeName => {
				nodes_attributes[nodeName].push(...el.attr);
			}));

	const setRadius = (el, r) => {
		el.setAttribute(nodes_attributes.circle[2], r);
		return el;
	};
	const setOrigin$1 = (el, a, b) => {
		[...makeCoordinates(...[a, b].flat()).slice(0, 2)]
			.forEach((value, i) => el.setAttribute(nodes_attributes.circle[i], value));
		return el;
	};
	const fromPoints = (a, b, c, d) => [a, b, svg_distance2([a, b], [c, d])];
	var circleDef = {
		circle: {
			args: (a, b, c, d) => {
				const coords = makeCoordinates(...[a, b, c, d].flat());
				switch (coords.length) {
				case 0: case 1: return [, , ...coords];
				case 2: case 3: return coords;
				default: return fromPoints(...coords);
				}
			},
			methods: {
				radius: setRadius,
				setRadius,
				origin: setOrigin$1,
				setOrigin: setOrigin$1,
				center: setOrigin$1,
				setCenter: setOrigin$1,
				position: setOrigin$1,
				setPosition: setOrigin$1,
			},
		},
	};

	const setRadii = (el, rx, ry) => {
		[, , rx, ry].forEach((value, i) => el.setAttribute(nodes_attributes.ellipse[i], value));
		return el;
	};
	const setOrigin = (el, a, b) => {
		[...makeCoordinates(...[a, b].flat()).slice(0, 2)]
			.forEach((value, i) => el.setAttribute(nodes_attributes.ellipse[i], value));
		return el;
	};
	var ellipseDef = {
		ellipse: {
			args: (a, b, c, d) => {
				const coords = makeCoordinates(...[a, b, c, d].flat()).slice(0, 4);
				switch (coords.length) {
				case 0: case 1: case 2: return [, , ...coords];
				default: return coords;
				}
			},
			methods: {
				radius: setRadii,
				setRadius: setRadii,
				origin: setOrigin,
				setOrigin,
				center: setOrigin,
				setCenter: setOrigin,
				position: setOrigin,
				setPosition: setOrigin,
			},
		},
	};

	const svgIsIterable = (obj) => obj != null
		&& typeof obj[Symbol.iterator] === str_function;
	const svgSemiFlattenArrays = function () {
		switch (arguments.length) {
		case 0: return Array.from(arguments);
		case 1: return svgIsIterable(arguments[0]) && typeof arguments[0] !== str_string
			? svgSemiFlattenArrays(...arguments[0])
			: [arguments[0]];
		default:
			return Array.from(arguments).map(a => (svgIsIterable(a)
				? [...svgSemiFlattenArrays(a)]
				: a));
		}
	};

	const Args$1 = (...args) => makeCoordinates(...svgSemiFlattenArrays(...args)).slice(0, 4);
	const setPoints$1 = (element, ...args) => {
		Args$1(...args).forEach((value, i) => element.setAttribute(nodes_attributes.line[i], value));
		return element;
	};
	var lineDef = {
		line: {
			args: Args$1,
			methods: {
				setPoints: setPoints$1,
			},
		},
	};

	const getD = (el) => {
		const attr = el.getAttribute("d");
		return (attr == null) ? "" : attr;
	};
	const clear = element => {
		element.removeAttribute("d");
		return element;
	};
	const appendPathCommand = (el, command, ...args) => {
		el.setAttribute("d", `${getD(el)}${command}${args.flat().join(" ")}`);
		return el;
	};
	const getCommands = element => parsePathCommands(getD(element));
	const path_methods = {
		addCommand: appendPathCommand,
		appendCommand: appendPathCommand,
		clear,
		getCommands: getCommands,
		get: getCommands,
		getD: el => el.getAttribute("d"),
	};
	Object.keys(pathCommandNames).forEach((key) => {
		path_methods[pathCommandNames[key]] = (el, ...args) => appendPathCommand(el, key, ...args);
	});
	var pathDef = {
		path: {
			methods: path_methods,
		},
	};

	const setRectSize = (el, rx, ry) => {
		[, , rx, ry]
			.forEach((value, i) => el.setAttribute(nodes_attributes.rect[i], value));
		return el;
	};
	const setRectOrigin = (el, a, b) => {
		[...makeCoordinates(...[a, b].flat()).slice(0, 2)]
			.forEach((value, i) => el.setAttribute(nodes_attributes.rect[i], value));
		return el;
	};
	const fixNegatives = function (arr) {
		[0, 1].forEach(i => {
			if (arr[2 + i] < 0) {
				if (arr[0 + i] === undefined) { arr[0 + i] = 0; }
				arr[0 + i] += arr[2 + i];
				arr[2 + i] = -arr[2 + i];
			}
		});
		return arr;
	};
	var rectDef = {
		rect: {
			args: (a, b, c, d) => {
				const coords = makeCoordinates(...[a, b, c, d].flat()).slice(0, 4);
				switch (coords.length) {
				case 0: case 1: case 2: case 3: return fixNegatives([, , ...coords]);
				default: return fixNegatives(coords);
				}
			},
			methods: {
				origin: setRectOrigin,
				setOrigin: setRectOrigin,
				center: setRectOrigin,
				setCenter: setRectOrigin,
				size: setRectSize,
				setSize: setRectSize,
			},
		},
	};

	var styleDef = {
		style: {
			init: (el, text) => {
				el.textContent = "";
				el.appendChild(makeCDATASection(text));
			},
			methods: {
				setTextContent: (el, text) => {
					el.textContent = "";
					el.appendChild(makeCDATASection(text));
					return el;
				},
			},
		},
	};

	var textDef = {
		text: {
			args: (a, b, c) => makeCoordinates(...[a, b, c].flat()).slice(0, 2),
			init: (element, a, b, c, d) => {
				const text = [a, b, c, d].filter(el => typeof el === str_string).shift();
				element.appendChild(SVGWindow().document.createTextNode(text || ""));
			},
		},
	};

	const makeIDString = function () {
		return Array.from(arguments)
			.filter(a => typeof a === str_string || a instanceof String)
			.shift() || makeUUID();
	};
	const maskArgs = (...args) => [makeIDString(...args)];
	var maskTypes = {
		mask: { args: maskArgs },
		clipPath: { args: maskArgs },
		symbol: { args: maskArgs },
		marker: {
			args: maskArgs,
			methods: {
				size: setViewBox,
				setViewBox: setViewBox,
			},
		},
	};

	const getPoints = (el) => {
		const attr = el.getAttribute(str_points);
		return (attr == null) ? "" : attr;
	};
	const polyString = function () {
		return Array
			.from(Array(Math.floor(arguments.length / 2)))
			.map((_, i) => `${arguments[i * 2 + 0]},${arguments[i * 2 + 1]}`)
			.join(" ");
	};
	const stringifyArgs = (...args) => [
		polyString(...makeCoordinates(...svgSemiFlattenArrays(...args))),
	];
	const setPoints = (element, ...args) => {
		element.setAttribute(str_points, stringifyArgs(...args)[0]);
		return element;
	};
	const addPoint = (element, ...args) => {
		element.setAttribute(str_points, [getPoints(element), stringifyArgs(...args)[0]]
			.filter(a => a !== "")
			.join(" "));
		return element;
	};
	const Args = function (...args) {
		return args.length === 1 && typeof args[0] === str_string
			? [args[0]]
			: stringifyArgs(...args);
	};
	var polyDefs = {
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

	var customDefinitions = {
		...svgDef,
		...gDef,
		...circleDef,
		...ellipseDef,
		...lineDef,
		...pathDef,
		...rectDef,
		...styleDef,
		...textDef,
		...maskTypes,
		...polyDefs,
	};

	const formula = {
		...customDefinitions,
	};
	const passthrough = function () { return Array.from(arguments); };
	nodeNames
		.filter(nodeName => !formula[nodeName])
		.forEach(nodeName => { formula[nodeName] = {}; });
	nodeNames.forEach((nodeName) => {
		if (!formula[nodeName].init) { formula[nodeName].init = passthrough; }
		if (!formula[nodeName].args) { formula[nodeName].args = passthrough; }
		if (!formula[nodeName].methods) { formula[nodeName].methods = {}; }
		if (!formula[nodeName].attributes) {
			formula[nodeName].attributes = nodes_attributes[nodeName] || [];
		}
	});

	const headerStuff = [
		classes_nodes.header,
		classes_nodes.invisible,
		classes_nodes.patterns,
	].flat();
	const drawingShapes = [
		classes_nodes.group,
		classes_nodes.visible,
		classes_nodes.text,
	].flat();
	const nodes_children = {
		svg: [["svg", "defs"], headerStuff, drawingShapes].flat(),
		defs: headerStuff,
		filter: classes_nodes.filter,
		g: drawingShapes,
		text: classes_nodes.childrenOfText,
		marker: drawingShapes,
		symbol: drawingShapes,
		clipPath: drawingShapes,
		mask: drawingShapes,
		linearGradient: classes_nodes.gradients,
		radialGradient: classes_nodes.gradients,
	};

	const RequiredAttrMap = {
		svg: {
			version: "1.1",
			xmlns: NS,
		},
		style: {
			type: "text/css",
		},
	};
	const applyStaticAttributes = (element, nodeName) => {
		if (!RequiredAttrMap[nodeName]) { return; }
		Object.keys(RequiredAttrMap[nodeName])
			.forEach(key => element.setAttribute(key, RequiredAttrMap[nodeName][key]));
	};
	const methodThis = {};
	const constructor = (nodeName, parent, ...initArgs) => {
		const { init, args: ARGS, methods, attributes } = formula[nodeName];
		const element = SVGWindow().document.createElementNS(NS, nodeName);
		if (parent) { parent.appendChild(element); }
		applyStaticAttributes(element, nodeName);
		init(element, ...initArgs);
		ARGS(...initArgs).forEach((v, i) => {
			element.setAttribute(formula[nodeName].attributes[i], v);
		});
		attributes.forEach((attribute) => {
			Object.defineProperty(element, toCamel(attribute), {
				value: function () {
					element.setAttribute(attribute, ...arguments);
					return element;
				},
			});
		});
		Object.keys(methods).forEach(methodName => Object
			.defineProperty(element, methodName, {
				value: function () {
					return methods[methodName].call(methodThis, element, ...arguments);
				},
			}));
		if (nodes_children[nodeName]) {
			nodes_children[nodeName].forEach((childNode) => {
				const value = function () { return constructor(childNode, element, ...arguments); };
				Object.defineProperty(element, childNode, { value });
			});
		}
		return element;
	};
	methodThis.Constructor = constructor;

	const applyConstructors = (library) => {
		Object.keys(formula).forEach(nodeName => {
			library[nodeName] = (...args) => constructor(nodeName, null, ...args);
		});
	};

	const svg = {
		formula,
		nodes_attributes,
		nodes_children,
		NS,
		...argumentMethods,
		...methods$1,
	};
	applyConstructors(svg);

	return svg;

}));

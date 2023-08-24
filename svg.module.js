/* svg (c) Kraft, MIT License */
const str_class = "class";
const str_function = "function";
const str_undefined = "undefined";
const str_boolean = "boolean";
const str_number = "number";
const str_string = "string";
const str_object = "object";
const str_svg = "svg";
const str_path = "path";
const str_id = "id";
const str_style = "style";
const str_viewBox = "viewBox";
const str_transform = "transform";
const str_points = "points";
const str_stroke = "stroke";
const str_fill = "fill";
const str_none = "none";
const str_arrow = "arrow";
const str_head = "head";
const str_tail = "tail";

const isBrowser = typeof window !== str_undefined
	&& typeof window.document !== str_undefined;
typeof process !== str_undefined
	&& process.versions != null
	&& process.versions.node != null;

const Messages = {
	window: "window not set; svg.window = @xmldom/xmldom",
};

const svgWindowContainer = { window: undefined };
const buildHTMLDocument = (newWindow) => new newWindow.DOMParser()
	.parseFromString("<!DOCTYPE html><title>.</title>", "text/html");
const setSVGWindow = (newWindow) => {
	if (!newWindow.document) { newWindow.document = buildHTMLDocument(newWindow); }
	svgWindowContainer.window = newWindow;
	return svgWindowContainer.window;
};
if (isBrowser) { svgWindowContainer.window = window; }
const SVGWindow = () => {
	if (svgWindowContainer.window === undefined) {
		throw Messages.window;
	}
	return svgWindowContainer.window;
};

const NS = "http://www.w3.org/2000/svg";

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
		"arc",
		"arrow",
		"curve",
		"parabola",
		"roundRect",
		"wedge",
		"origami",
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
			if (!nodes_attributes[nodeName]) { nodes_attributes[nodeName] = []; }
			nodes_attributes[nodeName].push(...el.attr);
		}));

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

const nodeNames = Object.values(classes_nodes).flat();

const cssColors = {
	black: "#000000",
	silver: "#c0c0c0",
	gray: "#808080",
	white: "#ffffff",
	maroon: "#800000",
	red: "#ff0000",
	purple: "#800080",
	fuchsia: "#ff00ff",
	green: "#008000",
	lime: "#00ff00",
	olive: "#808000",
	yellow: "#ffff00",
	navy: "#000080",
	blue: "#0000ff",
	teal: "#008080",
	aqua: "#00ffff",
	orange: "#ffa500",
	aliceblue: "#f0f8ff",
	antiquewhite: "#faebd7",
	aquamarine: "#7fffd4",
	azure: "#f0ffff",
	beige: "#f5f5dc",
	bisque: "#ffe4c4",
	blanchedalmond: "#ffebcd",
	blueviolet: "#8a2be2",
	brown: "#a52a2a",
	burlywood: "#deb887",
	cadetblue: "#5f9ea0",
	chartreuse: "#7fff00",
	chocolate: "#d2691e",
	coral: "#ff7f50",
	cornflowerblue: "#6495ed",
	cornsilk: "#fff8dc",
	crimson: "#dc143c",
	cyan: "#00ffff",
	darkblue: "#00008b",
	darkcyan: "#008b8b",
	darkgoldenrod: "#b8860b",
	darkgray: "#a9a9a9",
	darkgreen: "#006400",
	darkgrey: "#a9a9a9",
	darkkhaki: "#bdb76b",
	darkmagenta: "#8b008b",
	darkolivegreen: "#556b2f",
	darkorange: "#ff8c00",
	darkorchid: "#9932cc",
	darkred: "#8b0000",
	darksalmon: "#e9967a",
	darkseagreen: "#8fbc8f",
	darkslateblue: "#483d8b",
	darkslategray: "#2f4f4f",
	darkslategrey: "#2f4f4f",
	darkturquoise: "#00ced1",
	darkviolet: "#9400d3",
	deeppink: "#ff1493",
	deepskyblue: "#00bfff",
	dimgray: "#696969",
	dimgrey: "#696969",
	dodgerblue: "#1e90ff",
	firebrick: "#b22222",
	floralwhite: "#fffaf0",
	forestgreen: "#228b22",
	gainsboro: "#dcdcdc",
	ghostwhite: "#f8f8ff",
	gold: "#ffd700",
	goldenrod: "#daa520",
	greenyellow: "#adff2f",
	grey: "#808080",
	honeydew: "#f0fff0",
	hotpink: "#ff69b4",
	indianred: "#cd5c5c",
	indigo: "#4b0082",
	ivory: "#fffff0",
	khaki: "#f0e68c",
	lavender: "#e6e6fa",
	lavenderblush: "#fff0f5",
	lawngreen: "#7cfc00",
	lemonchiffon: "#fffacd",
	lightblue: "#add8e6",
	lightcoral: "#f08080",
	lightcyan: "#e0ffff",
	lightgoldenrodyellow: "#fafad2",
	lightgray: "#d3d3d3",
	lightgreen: "#90ee90",
	lightgrey: "#d3d3d3",
	lightpink: "#ffb6c1",
	lightsalmon: "#ffa07a",
	lightseagreen: "#20b2aa",
	lightskyblue: "#87cefa",
	lightslategray: "#778899",
	lightslategrey: "#778899",
	lightsteelblue: "#b0c4de",
	lightyellow: "#ffffe0",
	limegreen: "#32cd32",
	linen: "#faf0e6",
	magenta: "#ff00ff",
	mediumaquamarine: "#66cdaa",
	mediumblue: "#0000cd",
	mediumorchid: "#ba55d3",
	mediumpurple: "#9370db",
	mediumseagreen: "#3cb371",
	mediumslateblue: "#7b68ee",
	mediumspringgreen: "#00fa9a",
	mediumturquoise: "#48d1cc",
	mediumvioletred: "#c71585",
	midnightblue: "#191970",
	mintcream: "#f5fffa",
	mistyrose: "#ffe4e1",
	moccasin: "#ffe4b5",
	navajowhite: "#ffdead",
	oldlace: "#fdf5e6",
	olivedrab: "#6b8e23",
	orangered: "#ff4500",
	orchid: "#da70d6",
	palegoldenrod: "#eee8aa",
	palegreen: "#98fb98",
	paleturquoise: "#afeeee",
	palevioletred: "#db7093",
	papayawhip: "#ffefd5",
	peachpuff: "#ffdab9",
	peru: "#cd853f",
	pink: "#ffc0cb",
	plum: "#dda0dd",
	powderblue: "#b0e0e6",
	rosybrown: "#bc8f8f",
	royalblue: "#4169e1",
	saddlebrown: "#8b4513",
	salmon: "#fa8072",
	sandybrown: "#f4a460",
	seagreen: "#2e8b57",
	seashell: "#fff5ee",
	sienna: "#a0522d",
	skyblue: "#87ceeb",
	slateblue: "#6a5acd",
	slategray: "#708090",
	slategrey: "#708090",
	snow: "#fffafa",
	springgreen: "#00ff7f",
	steelblue: "#4682b4",
	tan: "#d2b48c",
	thistle: "#d8bfd8",
	tomato: "#ff6347",
	turquoise: "#40e0d0",
	violet: "#ee82ee",
	wheat: "#f5deb3",
	whitesmoke: "#f5f5f5",
	yellowgreen: "#9acd32",
};

const hslToRgb = (hue, saturation, lightness) => {
	const s = saturation / 100;
	const l = lightness / 100;
	const k = n => (n + hue / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = n => (
		l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
	);
	return [f(0) * 255, f(8) * 255, f(4) * 255];
};
const mapHexNumbers = (numbers, map) => {
	const chars = Array.from(Array(map.length))
		.map((_, i) => numbers[i] || "0");
	return numbers.length <= 4
		? map.map(i => chars[i]).join("")
		: chars.join("");
};
const hexToRgb = (string) => {
	const numbers = string.replace(/#(?=\S)/g, "");
	const hasAlpha = numbers.length === 4 || numbers.length === 8;
	const hexString = hasAlpha
		? mapHexNumbers(numbers, [0, 0, 1, 1, 2, 2, 3, 3])
		: mapHexNumbers(numbers, [0, 0, 1, 1, 2, 2]);
	const c = parseInt(hexString, 16);
	return hasAlpha
		? [(c >> 24) & 255, (c >> 16) & 255, (c >> 8) & 255, c & 255]
		: [(c >> 16) & 255, (c >> 8) & 255, c & 255];
};
const rgbToHex = (red, green, blue, alpha) => {
	const to16 = n => `00${Math.max(0, Math.min(Math.round(n), 255)).toString(16)}`
		.slice(-2);
	const hex = `#${[red, green, blue].map(to16).join("")}`;
	return alpha === undefined
		? hex
		: `${hex}${to16(alpha * 255)}`;
};

const convert = /*#__PURE__*/Object.freeze({
	__proto__: null,
	hexToRgb,
	hslToRgb,
	rgbToHex
});

const getParenNumbers = str => {
	const match = str.match(/\(([^\)]+)\)/g);
	if (match == null || !match.length) { return []; }
	return match[0]
		.substring(1, match[0].length - 1)
		.split(/[\s,]+/)
		.map(parseFloat);
};
const parseColorToRgb = (string) => {
	if (cssColors[string]) { return hexToRgb(cssColors[string]); }
	if (string[0] === "#") { return hexToRgb(string); }
	if (string.substring(0, 4) === "rgba"
		|| string.substring(0, 3) === "rgb") {
		const values = getParenNumbers(string);
		[0, 1, 2]
			.filter(i => values[i] === undefined)
			.forEach(i => { values[i] = 0; });
		return values;
	}
	if (string.substring(0, 4) === "hsla"
		|| string.substring(0, 3) === "hsl") {
		const values = getParenNumbers(string);
		[0, 1, 2]
			.filter(i => values[i] === undefined)
			.forEach(i => { values[i] = 0; });
		const rgb = hslToRgb(...values);
		if (values.length === 4) { rgb.push(values[3]); }
		return rgb;
	}
	return undefined;
};
const parseColorToHex = (string) => {
	if (cssColors[string]) { return cssColors[string].toUpperCase(); }
	if (string[0] === "#") { return rgbToHex(...hexToRgb(string)); }
	if (string.substring(0, 4) === "rgba"
		|| string.substring(0, 3) === "rgb") {
		return rgbToHex(...getParenNumbers(string));
	}
	if (string.substring(0, 4) === "hsla"
		|| string.substring(0, 3) === "hsl") {
		const values = getParenNumbers(string);
		[0, 1, 2]
			.filter(i => values[i] === undefined)
			.forEach(i => { values[i] = 0; });
		const rgb = hslToRgb(...values);
		if (values.length === 4) { rgb.push(values[3]); }
		[0, 1, 2].forEach(i => { rgb[i] *= 255; });
		rgbToHex(...rgb);
	}
	return undefined;
};

const parseColor = /*#__PURE__*/Object.freeze({
	__proto__: null,
	parseColorToHex,
	parseColorToRgb
});

const colors = {
	cssColors,
	...convert,
	...parseColor,
};

const svg_add2 = (a, b) => [a[0] + b[0], a[1] + b[1]];
const svg_sub2 = (a, b) => [a[0] - b[0], a[1] - b[1]];
const svg_scale2 = (a, s) => [a[0] * s, a[1] * s];
const svg_magnitudeSq2 = (a) => (a[0] ** 2) + (a[1] ** 2);
const svg_magnitude2 = (a) => Math.sqrt(svg_magnitudeSq2(a));
const svg_distanceSq2 = (a, b) => svg_magnitudeSq2(svg_sub2(a, b));
const svg_distance2 = (a, b) => Math.sqrt(svg_distanceSq2(a, b));
const svg_polar_to_cart = (a, d) => [Math.cos(a) * d, Math.sin(a) * d];
const svg_multiplyMatrices2 = (m1, m2) => [
	m1[0] * m2[0] + m1[2] * m2[1],
	m1[1] * m2[0] + m1[3] * m2[1],
	m1[0] * m2[2] + m1[2] * m2[3],
	m1[1] * m2[2] + m1[3] * m2[3],
	m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
	m1[1] * m2[4] + m1[3] * m2[5] + m1[5],
];

const svgMath = /*#__PURE__*/Object.freeze({
	__proto__: null,
	svg_add2,
	svg_distance2,
	svg_distanceSq2,
	svg_magnitude2,
	svg_magnitudeSq2,
	svg_multiplyMatrices2,
	svg_polar_to_cart,
	svg_scale2,
	svg_sub2
});

const parseTransform = function (transform) {
	const parsed = transform.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?\s*)+\))+/g);
	if (!parsed) { return []; }
	const listForm = parsed.map(a => a.match(/[\w\.\-]+/g));
	return listForm.map(a => ({
		transform: a.shift(),
		parameters: a.map(p => parseFloat(p)),
	}));
};
const matrixFormTranslate = function (params) {
	switch (params.length) {
	case 1: return [1, 0, 0, 1, params[0], 0];
	case 2: return [1, 0, 0, 1, params[0], params[1]];
	default: console.warn(`improper translate, ${params}`);
	}
	return undefined;
};
const matrixFormRotate = function (params) {
	const cos_p = Math.cos(params[0] / (180 * Math.PI));
	const sin_p = Math.sin(params[0] / (180 * Math.PI));
	switch (params.length) {
	case 1: return [cos_p, sin_p, -sin_p, cos_p, 0, 0];
	case 3: return [cos_p, sin_p, -sin_p, cos_p,
		-params[1] * cos_p + params[2] * sin_p + params[1],
		-params[1] * sin_p - params[2] * cos_p + params[2]];
	default: console.warn(`improper rotate, ${params}`);
	}
	return undefined;
};
const matrixFormScale = function (params) {
	switch (params.length) {
	case 1: return [params[0], 0, 0, params[0], 0, 0];
	case 2: return [params[0], 0, 0, params[1], 0, 0];
	default: console.warn(`improper scale, ${params}`);
	}
	return undefined;
};
const matrixFormSkewX = function (params) {
	return [1, 0, Math.tan(params[0] / (180 * Math.PI)), 1, 0, 0];
};
const matrixFormSkewY = function (params) {
	return [1, Math.tan(params[0] / (180 * Math.PI)), 0, 1, 0, 0];
};
const matrixForm = function (transformType, params) {
	switch (transformType) {
	case "translate": return matrixFormTranslate(params);
	case "rotate": return matrixFormRotate(params);
	case "scale": return matrixFormScale(params);
	case "skewX": return matrixFormSkewX(params);
	case "skewY": return matrixFormSkewY(params);
	case "matrix": return params;
	default: console.warn(`unknown transform type ${transformType}`);
	}
	return undefined;
};
const transformStringToMatrix = function (string) {
	return parseTransform(string)
		.map(el => matrixForm(el.transform, el.parameters))
		.filter(a => a !== undefined)
		.reduce((a, b) => svg_multiplyMatrices2(a, b), [1, 0, 0, 1, 0, 0]);
};

const transforms = /*#__PURE__*/Object.freeze({
	__proto__: null,
	transformStringToMatrix
});

const xmlStringToElement = (input, mimeType = "text/xml") => {
	const result = (new (SVGWindow().DOMParser)()).parseFromString(input, mimeType);
	return result ? result.documentElement : null;
};
const getRootParent = (el) => {
	let parent = el;
	while (parent.parentNode != null) {
		parent = parent.parentNode;
	}
	return parent;
};
const findElementTypeInParents = (element, nodeName) => {
	if ((element.nodeName || "") === nodeName) {
		return element;
	}
	return element.parentNode
		? findElementTypeInParents(element.parentNode, nodeName)
		: undefined;
};
const polyfillClassListAdd = (el, ...classes) => {
	const hash = {};
	const getClass = el.getAttribute("class");
	const classArray = getClass ? getClass.split(" ") : [];
	classArray.push(...classes);
	classArray.forEach(str => { hash[str] = true; });
	const classString = Object.keys(hash).join(" ");
	el.setAttribute("class", classString);
};
const addClass = (el, ...classes) => {
	if (!el || !classes.length) { return undefined; }
	return el.classList
		? el.classList.add(...classes)
		: polyfillClassListAdd(el, ...classes);
};
const flattenDomTree = (el) => (
	el.childNodes == null || !el.childNodes.length
		? [el]
		: Array.from(el.childNodes).flatMap(child => flattenDomTree(child))
);
const nodeSpecificAttrs = {
	svg: ["viewBox", "xmlns", "version"],
	line: ["x1", "y1", "x2", "y2"],
	rect: ["x", "y", "width", "height"],
	circle: ["cx", "cy", "r"],
	ellipse: ["cx", "cy", "rx", "ry"],
	polygon: ["points"],
	polyline: ["points"],
	path: ["d"],
};
const getAttributes = element => {
	const attributeValue = element.attributes;
	if (attributeValue == null) { return []; }
	const attributes = Array.from(attributeValue);
	return nodeSpecificAttrs[element.nodeName]
		? attributes
			.filter(a => !nodeSpecificAttrs[element.nodeName].includes(a.name))
		: attributes;
};
const objectifyAttributes = (list) => {
	const obj = {};
	list.forEach((a) => { obj[a.nodeName] = a.value; });
	return obj;
};
const attrAssign = (parentAttrs, element) => {
	const attrs = objectifyAttributes(getAttributes(element));
	if (!attrs.transform && !parentAttrs.transform) {
		return { ...parentAttrs, ...attrs };
	}
	const elemTransform = attrs.transform || "";
	const parentTransform = parentAttrs.transform || "";
	const elemMatrix = transformStringToMatrix(elemTransform);
	const parentMatrix = transformStringToMatrix(parentTransform);
	const matrix = svg_multiplyMatrices2(parentMatrix, elemMatrix);
	const transform = `matrix(${matrix.join(", ")})`;
	return { ...parentAttrs, ...attrs, transform };
};
const flattenDomTreeWithStyle = (element, attributes = {}) => (
	element.childNodes == null || !element.childNodes.length
		? [{ element, attributes }]
		: Array.from(element.childNodes)
			.flatMap(child => flattenDomTreeWithStyle(child, attrAssign(attributes, child)))
);

const dom = /*#__PURE__*/Object.freeze({
	__proto__: null,
	addClass,
	findElementTypeInParents,
	flattenDomTree,
	flattenDomTreeWithStyle,
	getRootParent,
	xmlStringToElement
});

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
	let origin = command === upper ? [0, 0] : offset;
	if (command === "V") { origin = [offset[0], 0]; }
	if (command === "H") { origin = [0, offset[1]]; }
	switch (upper) {
	case "V": return add2path(origin, [0, values[0]]);
	case "H": return add2path(origin, [values[0], 0]);
	case "M":
	case "L":
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
			const valueString = d.substring(el[1] + 1, el[2] + 1);
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

const pathMethods = /*#__PURE__*/Object.freeze({
	__proto__: null,
	parsePathCommands,
	parsePathCommandsWithEndpoints,
	pathCommandNames
});

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

const viewBox = /*#__PURE__*/Object.freeze({
	__proto__: null,
	convertToViewBox,
	getViewBox,
	setViewBox
});

const general = {
	...svgMath,
	...dom,
	makeCDATASection,
	...pathMethods,
	...transforms,
	...viewBox,
};

const getSVGFrame = function (element) {
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

const bgClass = "svg-background-rectangle";
const makeBackground = function (element, color) {
	let backRect = Array.from(element.childNodes)
		.filter(child => child.getAttribute(str_class) === bgClass)
		.shift();
	if (backRect == null) {
		backRect = SVGWindow().document.createElementNS(NS, "rect");
		getSVGFrame(element).forEach((n, i) => backRect.setAttribute(nodes_attributes.rect[i], n));
		backRect.setAttribute(str_class, bgClass);
		backRect.setAttribute(str_stroke, str_none);
		element.insertBefore(backRect, element.firstChild);
	}
	backRect.setAttribute(str_fill, color);
	return element;
};

const getAttr = (element) => {
	const t = element.getAttribute(str_transform);
	return (t == null || t === "") ? undefined : t;
};
const TransformMethods = {
	clearTransform: (el) => { el.removeAttribute(str_transform); return el; },
};
["translate", "rotate", "scale", "matrix"].forEach(key => {
	TransformMethods[key] = (element, ...args) => {
		element.setAttribute(
			str_transform,
			[getAttr(element), `${key}(${args.join(" ")})`]
				.filter(a => a !== undefined)
				.join(" "),
		);
		return element;
	};
});

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
const setAttributes = (element, attrs) => {
	Object.keys(attrs)
		.forEach(key => element.setAttribute(toKebab(key), attrs[key]));
	return element;
};

const DOM = /*#__PURE__*/Object.freeze({
	__proto__: null,
	appendTo,
	removeChildren,
	setAttributes
});

const setPadding = function (element, padding) {
	const viewBox = getViewBox(element);
	if (viewBox !== undefined) {
		setViewBox(element, ...[-padding, -padding, padding * 2, padding * 2]
			.map((nudge, i) => viewBox[i] + nudge));
	}
	return element;
};
const findOneElement = function (element, nodeName) {
	const styles = element.getElementsByTagName(nodeName);
	return styles.length ? styles[0] : null;
};
const stylesheet = function (element, textContent) {
	let styleSection = findOneElement(element, str_style);
	if (styleSection == null) {
		styleSection = SVGWindow().document.createElementNS(NS, str_style);
		styleSection.setTextContent = (text) => {
			styleSection.textContent = "";
			styleSection.appendChild(makeCDATASection(text));
			return styleSection;
		};
		element.insertBefore(styleSection, element.firstChild);
	}
	styleSection.textContent = "";
	styleSection.appendChild(makeCDATASection(textContent));
	return styleSection;
};
const clearSVG = (element) => {
	Array.from(element.attributes)
		.filter(attr => attr.name !== "xmlns" && attr.name !== "version")
		.forEach(attr => element.removeAttribute(attr.name));
	return removeChildren(element);
};
const methods$2 = {
	clear: clearSVG,
	size: setViewBox,
	setViewBox,
	getViewBox,
	padding: setPadding,
	background: makeBackground,
	getWidth: el => getSVGFrame(el)[2],
	getHeight: el => getSVGFrame(el)[3],
	stylesheet: function (el, text) { return stylesheet.call(this, el, text); },
	...TransformMethods,
	...DOM,
};

const eventNameCategories = {
	move: ["mousemove", "touchmove"],
	press: ["mousedown", "touchstart"],
	release: ["mouseup", "touchend"],
	leave: ["mouseleave", "touchcancel"],
};
const off = (el, handlers) => Object.values(eventNameCategories)
	.flat()
	.forEach((handlerName) => {
		handlers[handlerName].forEach(func => el
			.removeEventListener(handlerName, func));
		handlers[handlerName] = [];
	});
const defineGetter = (obj, prop, value) => Object
	.defineProperty(obj, prop, {
		get: () => value,
		enumerable: true,
		configurable: true,
	});
const TouchEvents = function (element) {
	const handlers = [];
	Object.keys(eventNameCategories).forEach((key) => {
		eventNameCategories[key].forEach((handler) => {
			handlers[handler] = [];
		});
	});
	const removeHandler = category => eventNameCategories[category]
		.forEach(handlerName => handlers[handlerName]
			.forEach(func => element.removeEventListener(handlerName, func)));
	Object.keys(eventNameCategories).forEach((category) => {
		Object.defineProperty(element, `on${capitalized(category)}`, {
			set: (handler) => {
				if (!element.addEventListener) { return; }
				if (handler == null) {
					removeHandler(category);
					return;
				}
				eventNameCategories[category].forEach((handlerName) => {
					const handlerFunc = (e) => {
						const pointer = (e.touches != null ? e.touches[0] : e);
						if (pointer !== undefined) {
							const { clientX, clientY } = pointer;
							const [x, y] = convertToViewBox(element, clientX, clientY);
							defineGetter(e, "x", x);
							defineGetter(e, "y", y);
						}
						handler(e);
					};
					handlers[handlerName].push(handlerFunc);
					element.addEventListener(handlerName, handlerFunc);
				});
			},
			enumerable: true,
		});
	});
	Object.defineProperty(element, "off", { value: () => off(element, handlers) });
};

const makeUUID = () => Math.random()
	.toString(36)
	.replace(/[^a-z]+/g, "")
	.concat("aaaaa")
	.substr(0, 5);

const Animation = function (element) {
	let start;
	let frame = 0;
	let requestId;
	const handlers = {};
	const stop = () => {
		if (SVGWindow().cancelAnimationFrame) {
			SVGWindow().cancelAnimationFrame(requestId);
		}
		Object.keys(handlers).forEach(uuid => delete handlers[uuid]);
	};
	const play = (handler) => {
		stop();
		if (!handler || !(SVGWindow().requestAnimationFrame)) { return; }
		start = performance.now();
		frame = 0;
		const uuid = makeUUID();
		handlers[uuid] = (now) => {
			const time = (now - start) * 1e-3;
			handler({ time, frame });
			frame += 1;
			if (handlers[uuid]) {
				requestId = SVGWindow().requestAnimationFrame(handlers[uuid]);
			}
		};
		requestId = SVGWindow().requestAnimationFrame(handlers[uuid]);
	};
	Object.defineProperty(element, "play", { set: play, enumerable: true });
	Object.defineProperty(element, "stop", { value: stop, enumerable: true });
};

const removeFromParent = svg => (svg && svg.parentNode
	? svg.parentNode.removeChild(svg)
	: undefined);
const possiblePositionAttributes = [["cx", "cy"], ["x", "y"]];
const controlPoint = function (parent, options = {}) {
	const position = [0, 0];
	const cp = {
		selected: false,
		svg: undefined,
		updatePosition: input => input,
	};
	const updateSVG = () => {
		if (!cp.svg) { return; }
		if (!cp.svg.parentNode) {
			parent.appendChild(cp.svg);
		}
		possiblePositionAttributes
			.filter(coords => cp.svg[coords[0]] != null)
			.forEach(coords => coords.forEach((attr, i) => {
				cp.svg.setAttribute(attr, position[i]);
			}));
	};
	const proxy = new Proxy(position, {
		set: (target, property, value) => {
			target[property] = value;
			updateSVG();
			return true;
		},
	});
	const setPosition = function (...args) {
		makeCoordinates(...args.flat())
			.forEach((n, i) => { position[i] = n; });
		updateSVG();
		if (typeof position.delegate === str_function) {
			position.delegate.apply(position.pointsContainer, [proxy, position.pointsContainer]);
		}
	};
	position.delegate = undefined;
	position.setPosition = setPosition;
	position.onMouseMove = mouse => (cp.selected
		? setPosition(cp.updatePosition(mouse))
		: undefined);
	position.onMouseUp = () => { cp.selected = false; };
	position.distance = mouse => Math.sqrt(svg_distanceSq2(mouse, position));
	["x", "y"].forEach((prop, i) => Object.defineProperty(position, prop, {
		get: () => position[i],
		set: (v) => { position[i] = v; }
	}));
	[str_svg, "updatePosition", "selected"].forEach(key => Object
		.defineProperty(position, key, {
			get: () => cp[key],
			set: (v) => { cp[key] = v; },
		}));
	Object.defineProperty(position, "remove", {
		value: () => {
			removeFromParent(cp.svg);
			position.delegate = undefined;
		},
	});
	return proxy;
};
const controls = function (svg, number, options) {
	let selected;
	let delegate;
	const points = Array.from(Array(number))
		.map(() => controlPoint(svg, options));
	const protocol = point => (typeof delegate === str_function
		? delegate.call(points, point, selected, points)
		: undefined);
	points.forEach((p) => {
		p.delegate = protocol;
		p.pointsContainer = points;
	});
	const mousePressedHandler = function (mouse) {
		if (!(points.length > 0)) { return; }
		selected = points
			.map((p, i) => ({ i, d: svg_distanceSq2(p, [mouse.x, mouse.y]) }))
			.sort((a, b) => a.d - b.d)
			.shift()
			.i;
		points[selected].selected = true;
	};
	const mouseMovedHandler = function (mouse) {
		points.forEach(p => p.onMouseMove(mouse));
	};
	const mouseReleasedHandler = function () {
		points.forEach(p => p.onMouseUp());
		selected = undefined;
	};
	svg.onPress = mousePressedHandler;
	svg.onMove = mouseMovedHandler;
	svg.onRelease = mouseReleasedHandler;
	Object.defineProperty(points, "selectedIndex", { get: () => selected });
	Object.defineProperty(points, "selected", { get: () => points[selected] });
	Object.defineProperty(points, "add", {
		value: (opt) => {
			points.push(controlPoint(svg, opt));
		},
	});
	points.removeAll = () => {
		while (points.length > 0) {
			points.pop().remove();
		}
	};
	const functionalMethods = {
		onChange: (func, runOnceAtStart) => {
			delegate = func;
			if (runOnceAtStart === true) {
				const index = points.length - 1;
				func.call(points, points[index], index, points);
			}
		},
		position: func => points.forEach((p, i) => p.setPosition(func.call(points, p, i, points))),
		svg: func => points.forEach((p, i) => { p.svg = func.call(points, p, i, points); }),
	};
	Object.keys(functionalMethods).forEach((key) => {
		points[key] = function () {
			if (typeof arguments[0] === str_function) {
				functionalMethods[key](...arguments);
			}
			return points;
		};
	});
	points.parent = function (parent) {
		if (parent != null && parent.appendChild != null) {
			points.forEach((p) => { parent.appendChild(p.svg); });
		}
		return points;
	};
	return points;
};
const applyControlsToSVG = (svg) => {
	svg.controls = (...args) => controls.call(svg, svg, ...args);
};

const svgDef = {
	svg: {
		args: (...args) => [makeViewBox(makeCoordinates(...args))].filter(a => a != null),
		methods: methods$2,
		init: (...args) => {
			const element = SVGWindow().document.createElementNS(NS, "svg");
			element.setAttribute("version", "1.1");
			element.setAttribute("xmlns", NS);
			args.filter(a => a != null)
				.filter(el => el.appendChild)
				.forEach(parent => parent.appendChild(element));
			TouchEvents(element);
			Animation(element);
			applyControlsToSVG(element);
			return element;
		},
	},
};

const findIdURL = function (arg) {
	if (arg == null) { return ""; }
	if (typeof arg === str_string) {
		return arg.slice(0, 3) === "url"
			? arg
			: `url(#${arg})`;
	}
	if (arg.getAttribute != null) {
		const idString = arg.getAttribute(str_id);
		return `url(#${idString})`;
	}
	return "";
};
const methods$1 = {};
["clip-path",
	"mask",
	"symbol",
	"marker-end",
	"marker-mid",
	"marker-start",
].forEach(attr => {
	methods$1[toCamel(attr)] = (element, parent) => {
		element.setAttribute(attr, findIdURL(parent));
		return element;
	};
});

const gDef = {
	g: {
		methods: {
			...TransformMethods,
			...methods$1,
			...DOM,
		},
	},
};

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
const circleDef = {
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
			...TransformMethods,
			...methods$1,
			...DOM,
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
const ellipseDef = {
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
			...TransformMethods,
			...methods$1,
			...DOM,
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
const setPoints$3 = (element, ...args) => {
	Args$1(...args).forEach((value, i) => element.setAttribute(nodes_attributes.line[i], value));
	return element;
};
const lineDef = {
	line: {
		args: Args$1,
		methods: {
			setPoints: setPoints$3,
			...TransformMethods,
			...methods$1,
			...DOM,
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
	...TransformMethods,
	...methods$1,
	...DOM,
};
Object.keys(pathCommandNames).forEach((key) => {
	path_methods[pathCommandNames[key]] = (el, ...args) => appendPathCommand(el, key, ...args);
});
const pathDef = {
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
const rectDef = {
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
			...TransformMethods,
			...methods$1,
			...DOM,
		},
	},
};

const styleDef = {
	style: {
		init: (text) => {
			const el = SVGWindow().document.createElementNS(NS, "style");
			el.setAttribute("type", "text/css");
			el.textContent = "";
			el.appendChild(makeCDATASection(text));
			return el;
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

const textDef = {
	text: {
		args: (a, b, c) => makeCoordinates(...[a, b, c].flat()).slice(0, 2),
		init: (a, b, c, d) => {
			const element = SVGWindow().document.createElementNS(NS, "text");
			const text = [a, b, c, d].filter(el => typeof el === str_string).shift();
			element.appendChild(SVGWindow().document.createTextNode(text || ""));
			return element;
		},
		methods: {
			...TransformMethods,
			...methods$1,
			appendTo,
			setAttributes,
		},
	},
};

const makeIDString = function () {
	return Array.from(arguments)
		.filter(a => typeof a === str_string || a instanceof String)
		.shift() || makeUUID();
};
const maskArgs = (...args) => [makeIDString(...args)];
const maskTypes = {
	mask: {
		args: maskArgs,
		methods: {
			...TransformMethods,
			...methods$1,
			...DOM,
		},
	},
	clipPath: {
		args: maskArgs,
		methods: {
			...TransformMethods,
			...methods$1,
			...DOM,
		},
	},
	symbol: {
		args: maskArgs,
		methods: {
			...TransformMethods,
			...methods$1,
			...DOM,
		},
	},
	marker: {
		args: maskArgs,
		methods: {
			size: setViewBox,
			setViewBox: setViewBox,
			...TransformMethods,
			...methods$1,
			...DOM,
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
const setPoints$2 = (element, ...args) => {
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
const polyDefs = {
	polyline: {
		args: Args,
		methods: {
			setPoints: setPoints$2,
			addPoint,
			...TransformMethods,
			...methods$1,
			...DOM,
		},
	},
	polygon: {
		args: Args,
		methods: {
			setPoints: setPoints$2,
			addPoint,
			...TransformMethods,
			...methods$1,
			...DOM,
		},
	},
};

const arcPath = (x, y, radius, startAngle, endAngle, includeCenter = false) => {
	if (endAngle == null) { return ""; }
	const start = svg_polar_to_cart(startAngle, radius);
	const end = svg_polar_to_cart(endAngle, radius);
	const arcVec = [end[0] - start[0], end[1] - start[1]];
	const py = start[0] * end[1] - start[1] * end[0];
	const px = start[0] * end[0] + start[1] * end[1];
	const arcdir = (Math.atan2(py, px) > 0 ? 0 : 1);
	let d = (includeCenter
		? `M ${x},${y} l ${start[0]},${start[1]} `
		: `M ${x + start[0]},${y + start[1]} `);
	d += ["a ", radius, radius, 0, arcdir, 1, arcVec[0], arcVec[1]].join(" ");
	if (includeCenter) { d += " Z"; }
	return d;
};

const arcArguments = (a, b, c, d, e) => [arcPath(a, b, c, d, e, false)];
const arcDef = {
	arc: {
		nodeName: str_path,
		attributes: ["d"],
		args: arcArguments,
		methods: {
			setArc: (el, ...args) => el.setAttribute("d", arcArguments(...args)),
			...TransformMethods,
		},
	},
};

const ends = [str_tail, str_head];
const stringifyPoint = p => p.join(",");
const pointsToPath = (points) => "M" + points.map(pt => pt.join(",")).join("L") + "Z";
const makeArrowPaths = function (options) {
	let pts = [[0,1], [2,3]].map(pt => pt.map(i => options.points[i] || 0));
	let vector = svg_sub2(pts[1], pts[0]);
	let midpoint = svg_add2(pts[0], svg_scale2(vector, 0.5));
	const len = svg_magnitude2(vector);
	const minLength = ends
		.map(s => (options[s].visible
			? (1 + options[s].padding) * options[s].height * 2.5
			: 0))
		.reduce((a, b) => a + b, 0);
	if (len < minLength) {
		const minVec = len === 0 ? [minLength, 0] : svg_scale2(vector, minLength / len);
		pts = [svg_sub2, svg_add2].map(f => f(midpoint, svg_scale2(minVec, 0.5)));
		vector = svg_sub2(pts[1], pts[0]);
	}
	let perpendicular = [vector[1], -vector[0]];
	let bezPoint = svg_add2(midpoint, svg_scale2(perpendicular, options.bend));
	const bezs = pts.map(pt => svg_sub2(bezPoint, pt));
	const bezsLen = bezs.map(v => svg_magnitude2(v));
	const bezsNorm = bezs.map((bez, i) => bezsLen[i] === 0
		? bez
		: svg_scale2(bez, 1 / bezsLen[i]));
	const vectors = bezsNorm.map(norm => svg_scale2(norm, -1));
	const normals = vectors.map(vec => [vec[1], -vec[0]]);
	const pad = ends.map((s, i) => options[s].padding
		? options[s].padding
		: (options.padding ? options.padding : 0.0));
	const scales = ends
		.map((s, i) => options[s].height * (options[s].visible ? 1 : 0))
		.map((n, i) => n + pad[i]);
	const arcs = pts.map((pt, i) => svg_add2(pt, svg_scale2(bezsNorm[i], scales[i])));
	vector = svg_sub2(arcs[1], arcs[0]);
	perpendicular = [vector[1], -vector[0]];
	midpoint = svg_add2(arcs[0], svg_scale2(vector, 0.5));
	bezPoint = svg_add2(midpoint, svg_scale2(perpendicular, options.bend));
	const controls = arcs
		.map((arc, i) => svg_add2(arc, svg_scale2(svg_sub2(bezPoint, arc), options.pinch)));
	const polyPoints = ends.map((s, i) => [
		svg_add2(arcs[i], svg_scale2(vectors[i], options[s].height)),
		svg_add2(arcs[i], svg_scale2(normals[i], options[s].width / 2)),
		svg_add2(arcs[i], svg_scale2(normals[i], -options[s].width / 2)),
	]);
	return {
		line: `M${stringifyPoint(arcs[0])}C${stringifyPoint(controls[0])},${stringifyPoint(controls[1])},${stringifyPoint(arcs[1])}`,
		tail: pointsToPath(polyPoints[0]),
		head: pointsToPath(polyPoints[1]),
	};
};

const setArrowheadOptions = (element, options, which) => {
	if (typeof options === str_boolean) {
		element.options[which].visible = options;
	} else if (typeof options === str_object) {
		Object.assign(element.options[which], options);
		if (options.visible == null) {
			element.options[which].visible = true;
		}
	} else if (options == null) {
		element.options[which].visible = true;
	}
};
const setArrowStyle = (element, options = {}, which = str_head) => {
	const path = element.getElementsByClassName(`${str_arrow}-${which}`)[0];
	Object.keys(options)
		.map(key => ({ key, fn: path[toCamel(key)] }))
		.filter(el => typeof el.fn === str_function && el.key !== "class")
		.forEach(el => el.fn(options[el.key]));
	Object.keys(options)
		.filter(key => key === "class")
		.forEach(key => path.classList.add(options[key]));
};
const redraw = (element) => {
	const paths = makeArrowPaths(element.options);
	Object.keys(paths)
		.map(path => ({
			path,
			element: element.getElementsByClassName(`${str_arrow}-${path}`)[0],
		}))
		.filter(el => el.element)
		.map(el => { el.element.setAttribute("d", paths[el.path]); return el; })
		.filter(el => element.options[el.path])
		.forEach(el => el.element.setAttribute(
			"visibility",
			element.options[el.path].visible
				? "visible"
				: "hidden",
		));
	return element;
};
const setPoints$1 = (element, ...args) => {
	element.options.points = makeCoordinates(...svgSemiFlattenArrays(...args)).slice(0, 4);
	return redraw(element);
};
const bend$1 = (element, amount) => {
	element.options.bend = amount;
	return redraw(element);
};
const pinch$1 = (element, amount) => {
	element.options.pinch = amount;
	return redraw(element);
};
const padding = (element, amount) => {
	element.options.padding = amount;
	return redraw(element);
};
const head = (element, options) => {
	setArrowheadOptions(element, options, str_head);
	setArrowStyle(element, options, str_head);
	return redraw(element);
};
const tail = (element, options) => {
	setArrowheadOptions(element, options, str_tail);
	setArrowStyle(element, options, str_tail);
	return redraw(element);
};
const getLine = element => element.getElementsByClassName(`${str_arrow}-line`)[0];
const getHead = element => element.getElementsByClassName(`${str_arrow}-${str_head}`)[0];
const getTail = element => element.getElementsByClassName(`${str_arrow}-${str_tail}`)[0];
const ArrowMethods = {
	setPoints: setPoints$1,
	points: setPoints$1,
	bend: bend$1,
	pinch: pinch$1,
	padding,
	head,
	tail,
	getLine,
	getHead,
	getTail,
	...TransformMethods,
};

const endOptions = () => ({
	visible: false,
	width: 8,
	height: 10,
	padding: 0.0,
});
const makeArrowOptions = () => ({
	head: endOptions(),
	tail: endOptions(),
	bend: 0.0,
	padding: 0.0,
	pinch: 0.618,
	points: [],
});

const arrowKeys = Object.keys(makeArrowOptions());
const matchingOptions = (...args) => {
	for (let a = 0; a < args.length; a += 1) {
		if (typeof args[a] !== str_object) { continue; }
		const keys = Object.keys(args[a]);
		for (let i = 0; i < keys.length; i += 1) {
			if (arrowKeys.includes(keys[i])) {
				return args[a];
			}
		}
	}
	return undefined;
};
const init$1 = function (element, ...args) {
	element.classList.add(str_arrow);
	const paths = ["line", str_tail, str_head].map(key => {
		const path = SVGWindow().document.createElementNS(NS, str_path);
		path.className = `${str_arrow}-${key}`;
		element.appendChild(path);
		return path;
	});
	paths[0].setAttribute(str_style, "fill:none;");
	paths[1].setAttribute(str_stroke, str_none);
	paths[2].setAttribute(str_stroke, str_none);
	element.options = makeArrowOptions();
	ArrowMethods.setPoints(element, ...args);
	const options = matchingOptions(...args);
	if (options) {
		Object.keys(options)
			.filter(key => ArrowMethods[key])
			.forEach(key => ArrowMethods[key](element, options[key]));
	}
	return element;
};

const arrowDef = {
	arrow: {
		nodeName: "g",
		attributes: [],
		args: () => [],
		methods: ArrowMethods,
		init: init$1,
	},
};

const makeCurvePath = (endpoints = [], bend = 0, pinch = 0.5) => {
	const tailPt = [endpoints[0] || 0, endpoints[1] || 0];
	const headPt = [endpoints[2] || 0, endpoints[3] || 0];
	const vector = svg_sub2(headPt, tailPt);
	const midpoint = svg_add2(tailPt, svg_scale2(vector, 0.5));
	const perpendicular = [vector[1], -vector[0]];
	const bezPoint = svg_add2(midpoint, svg_scale2(perpendicular, bend));
	const tailControl = svg_add2(tailPt, svg_scale2(svg_sub2(bezPoint, tailPt), pinch));
	const headControl = svg_add2(headPt, svg_scale2(svg_sub2(bezPoint, headPt), pinch));
	return `M${tailPt[0]},${tailPt[1]}C${tailControl[0]},${tailControl[1]} ${headControl[0]},${headControl[1]} ${headPt[0]},${headPt[1]}`;
};

const curveArguments = (...args) => [
	makeCurvePath(makeCoordinates(...args.flat())),
];

const getNumbersFromPathCommand = str => str
	.slice(1)
	.split(/[, ]+/)
	.map(s => parseFloat(s));
const getCurveTos = d => d
	.match(/[Cc][(0-9), .-]+/)
	.map(curve => getNumbersFromPathCommand(curve));
const getMoveTos = d => d
	.match(/[Mm][(0-9), .-]+/)
	.map(curve => getNumbersFromPathCommand(curve));
const getCurveEndpoints = (d) => {
	const move = getMoveTos(d).shift();
	const curve = getCurveTos(d).shift();
	const start = move
		? [move[move.length - 2], move[move.length - 1]]
		: [0, 0];
	const end = curve
		? [curve[curve.length - 2], curve[curve.length - 1]]
		: [0, 0];
	return [...start, ...end];
};

const setPoints = (element, ...args) => {
	const coords = makeCoordinates(...args.flat()).slice(0, 4);
	element.setAttribute("d", makeCurvePath(coords, element._bend, element._pinch));
	return element;
};
const bend = (element, amount) => {
	element._bend = amount;
	return setPoints(element, ...getCurveEndpoints(element.getAttribute("d")));
};
const pinch = (element, amount) => {
	element._pinch = amount;
	return setPoints(element, ...getCurveEndpoints(element.getAttribute("d")));
};
const curve_methods = {
	setPoints,
	bend,
	pinch,
	...TransformMethods,
};

const curveDef = {
	curve: {
		nodeName: str_path,
		attributes: ["d"],
		args: curveArguments,
		methods: curve_methods,
	},
};

const wedgeArguments = (a, b, c, d, e) => [arcPath(a, b, c, d, e, true)];
const wedgeDef = {
	wedge: {
		nodeName: str_path,
		args: wedgeArguments,
		attributes: ["d"],
		methods: {
			setArc: (el, ...args) => el.setAttribute("d", wedgeArguments(...args)),
			...TransformMethods,
		},
	},
};

const lib = {};

const init = (graph, ...args) => {
	const g = SVGWindow().document.createElementNS(NS, "g");
	lib.ear.convert.foldToSvg.render(graph, g, ...args);
	return g;
};

const methods = {
	...TransformMethods,
	...methods$1,
	...DOM,
};

const origamiDef = {
	origami: {
		nodeName: "g",
		init,
		args: () => [],
		methods,
	},
};

const extensions = {
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
	...arcDef,
	...arrowDef,
	...curveDef,
	...wedgeDef,
	...origamiDef,
};

const passthroughArgs = (...args) => args;
const Constructor = (name, parent, ...initArgs) => {
	const nodeName = extensions[name] && extensions[name].nodeName
		? extensions[name].nodeName
		: name;
	const { init, args, methods } = extensions[name] || {};
	const attributes = nodes_attributes[nodeName] || [];
	const children = nodes_children[nodeName] || [];
	const element = init
		?	init(...initArgs)
		: SVGWindow().document.createElementNS(NS, nodeName);
	if (parent) { parent.appendChild(element); }
	const processArgs = args || passthroughArgs;
	processArgs(...initArgs).forEach((v, i) => {
		element.setAttribute(nodes_attributes[nodeName][i], v);
	});
	if (methods) {
		Object.keys(methods)
			.forEach(methodName => Object.defineProperty(element, methodName, {
				value: function () {
					return methods[methodName](element, ...arguments);
				},
			}));
	}
	attributes.forEach((attribute) => {
		const attrNameCamel = toCamel(attribute);
		if (element[attrNameCamel]) { return; }
		Object.defineProperty(element, attrNameCamel, {
			value: function () {
				element.setAttribute(attribute, ...arguments);
				return element;
			},
		});
	});
	children.forEach((childNode) => {
		if (element[childNode]) { return; }
		const value = function () { return Constructor(childNode, element, ...arguments); };
		Object.defineProperty(element, childNode, { value });
	});
	return element;
};

const SVG = (...args) => {
	const svg = Constructor(str_svg, null, ...args);
	const initialize = () => args
		.filter(arg => typeof arg === str_function)
		.forEach(func => func.call(svg, svg));
	if (SVGWindow().document.readyState === "loading") {
		SVGWindow().document.addEventListener("DOMContentLoaded", initialize);
	} else {
		initialize();
	}
	return svg;
};
Object.assign(SVG, {
	NS,
	nodes_attributes,
	nodes_children,
	extensions,
	...colors,
	...general,
});
nodeNames.forEach(nodeName => {
	SVG[nodeName] = (...args) => Constructor(nodeName, null, ...args);
});
Object.defineProperty(SVG, "window", {
	enumerable: false,
	set: setSVGWindow,
});

export { SVG as default };

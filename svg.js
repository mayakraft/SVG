/* svg (c) Kraft, MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.svg = factory());
})(this, (function () { 'use strict';

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

	const isBrowser = typeof window !== str_undefined
		&& typeof window.document !== str_undefined;
	typeof process !== str_undefined
		&& process.versions != null
		&& process.versions.node != null;

	var Messages = {
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

	var NS = "http://www.w3.org/2000/svg";

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

	const makeCDATASection = (text) => (new (SVGWindow()).DOMParser())
		.parseFromString("<root></root>", "text/xml")
		.createCDATASection(text);

	const toCamel = (s) => s
		.replace(/([-_][a-z])/ig, $1 => $1
			.toUpperCase()
			.replace("-", "")
			.replace("_", ""));
	const capitalized = (s) => s
		.charAt(0).toUpperCase() + s.slice(1);

	const removeChildren = (element) => {
		while (element.lastChild) {
			element.removeChild(element.lastChild);
		}
		return element;
	};
	const clearSVG = (element) => {
		Array.from(element.attributes)
			.filter(attr => attr.name !== "xmlns" && attr.name !== "version")
			.forEach(attr => element.removeAttribute(attr.name));
		return removeChildren(element);
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
	var methods$1 = {
		clear: clearSVG,
		removeChildren,
		size: setViewBox,
		setViewBox,
		getViewBox,
		padding: setPadding,
		background: makeBackground,
		getWidth: el => getSVGFrame(el)[2],
		getHeight: el => getSVGFrame(el)[3],
		stylesheet: function (el, text) { return stylesheet.call(this, el, text); },
		...TransformMethods,
	};

	const categories = {
		move: ["mousemove", "touchmove"],
		press: ["mousedown", "touchstart"],
		release: ["mouseup", "touchend"],
		leave: ["mouseleave", "touchcancel"],
	};
	const handlerNames = Object.values(categories)
		.reduce((a, b) => a.concat(b), []);
	const off = (element, handlers) => handlerNames.forEach((handlerName) => {
		handlers[handlerName].forEach(func => element.removeEventListener(handlerName, func));
		handlers[handlerName] = [];
	});
	const defineGetter = (obj, prop, value) => Object.defineProperty(obj, prop, {
		get: () => value,
		enumerable: true,
		configurable: true,
	});
	const assignPress = (e, startPoint) => {
		["pressX", "pressY"].filter(prop => !Object.prototype.hasOwnProperty.call(e, prop))
			.forEach((prop, i) => defineGetter(e, prop, startPoint[i]));
		if (!Object.prototype.hasOwnProperty.call(e, "press")) {
			defineGetter(e, "press", [...startPoint]);
		}
	};
	const TouchEvents = function (element) {
		let startPoint = [];
		const handlers = [];
		Object.keys(categories).forEach((key) => {
			categories[key].forEach((handler) => {
				handlers[handler] = [];
			});
		});
		const removeHandler = category => categories[category]
			.forEach(handlerName => handlers[handlerName]
				.forEach(func => element.removeEventListener(handlerName, func)));
		const categoryUpdate = {
			press: (e, viewPoint) => {
				startPoint = viewPoint;
				assignPress(e, startPoint);
			},
			release: () => {},
			leave: () => {},
			move: (e, viewPoint) => {
				if (e.buttons > 0 && startPoint[0] === undefined) {
					startPoint = viewPoint;
				} else if (e.buttons === 0 && startPoint[0] !== undefined) {
					startPoint = [];
				}
				assignPress(e, startPoint);
			},
		};
		Object.keys(categories).forEach((category) => {
			const propName = `on${capitalized(category)}`;
			Object.defineProperty(element, propName, {
				set: (handler) => {
					if (handler == null) {
						removeHandler(category);
						return;
					}
					categories[category].forEach((handlerName) => {
						const handlerFunc = (e) => {
							const pointer = (e.touches != null
								? e.touches[0]
								: e);
							if (pointer !== undefined) {
								const viewPoint = convertToViewBox(element, pointer.clientX, pointer.clientY)
									.map(n => (Number.isNaN(n) ? undefined : n));
								["x", "y"]
									.filter(prop => !Object.prototype.hasOwnProperty.call(e, prop))
									.forEach((prop, i) => defineGetter(e, prop, viewPoint[i]));
								if (!Object.prototype.hasOwnProperty.call(e, "position")) {
									defineGetter(e, "position", [...viewPoint]);
								}
								categoryUpdate[category](e, viewPoint);
							}
							handler(e);
						};
						if (element.addEventListener) {
							handlers[handlerName].push(handlerFunc);
							element.addEventListener(handlerName, handlerFunc);
						}
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
		const handlers = {};
		let frame = 0;
		let requestId;
		const removeHandlers = () => {
			if (SVGWindow().cancelAnimationFrame) {
				SVGWindow().cancelAnimationFrame(requestId);
			}
			Object.keys(handlers)
				.forEach(uuid => delete handlers[uuid]);
			start = undefined;
			frame = 0;
		};
		Object.defineProperty(element, "play", {
			set: (handler) => {
				removeHandlers();
				if (handler == null) { return; }
				const uuid = makeUUID();
				const handlerFunc = (e) => {
					if (!start) {
						start = e;
						frame = 0;
					}
					const progress = (e - start) * 0.001;
					handler({ time: progress, frame });
					frame += 1;
					if (handlers[uuid]) {
						requestId = SVGWindow().requestAnimationFrame(handlers[uuid]);
					}
				};
				handlers[uuid] = handlerFunc;
				if (SVGWindow().requestAnimationFrame) {
					requestId = SVGWindow().requestAnimationFrame(handlers[uuid]);
				}
			},
			enumerable: true,
		});
		Object.defineProperty(element, "stop", { value: removeHandlers, enumerable: true });
	};

	const svg_sub2 = (a, b) => [a[0] - b[0], a[1] - b[1]];
	const svg_magnitudeSq2 = (a) => (a[0] ** 2) + (a[1] ** 2);
	const svg_distanceSq2 = (a, b) => svg_magnitudeSq2(svg_sub2(a, b));
	const svg_distance2 = (a, b) => Math.sqrt(svg_distanceSq2(a, b));

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

	var svgDef = {
		svg: {
			args: (...args) => [makeViewBox(makeCoordinates(...args))].filter(a => a != null),
			methods: methods$1,
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
	const methods = {};
	["clip-path",
		"mask",
		"symbol",
		"marker-end",
		"marker-mid",
		"marker-start",
	].forEach(attr => {
		methods[toCamel(attr)] = (element, parent) => element.setAttribute(attr, findIdURL(parent));
	});

	const loadGroup = (...sources) => {
		const group = SVGWindow().document.createElementNS(NS, "g");
		return group;
	};
	var gDef = {
		g: {
			init: loadGroup,
			methods: {
				load: loadGroup,
				removeChildren,
				...TransformMethods,
				...methods,
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
				...TransformMethods,
				...methods,
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
				...TransformMethods,
				...methods,
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
				...TransformMethods,
				...methods,
			},
		},
	};

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
		...methods,
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
				...TransformMethods,
				...methods,
			},
		},
	};

	var styleDef = {
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

	var textDef = {
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
				...methods,
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
		mask: {
			args: maskArgs,
			methods: {
				removeChildren,
				...TransformMethods,
				...methods,
			},
		},
		clipPath: {
			args: maskArgs,
			methods: {
				removeChildren,
				...TransformMethods,
				...methods,
			},
		},
		symbol: {
			args: maskArgs,
			methods: {
				removeChildren,
				...TransformMethods,
				...methods,
			},
		},
		marker: {
			args: maskArgs,
			methods: {
				size: setViewBox,
				setViewBox: setViewBox,
				removeChildren,
				...TransformMethods,
				...methods,
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
				...TransformMethods,
				...methods,
			},
		},
		polygon: {
			args: Args,
			methods: {
				setPoints,
				addPoint,
				...TransformMethods,
				...methods,
			},
		},
	};

	var extensions = {
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

	const passthroughArgs = (...args) => args;
	const Constructor = (name, parent, ...initArgs) => {
		const nodeName = extensions[name] && extensions[name].nodeName
			? extensions[name].nodeName
			: name;
		const { init, args, methods } = extensions[nodeName] || {};
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

	const nodeNames = Object.values(classes_nodes).flat();

	const svg = (...args) => Constructor("svg", null, ...args);
	Object.assign(svg, {
		NS,
		nodes_attributes,
		nodes_children,
		extensions,
	});
	nodeNames.forEach(nodeName => {
		svg[nodeName] = (...args) => Constructor(nodeName, null, ...args);
	});
	Object.defineProperty(svg, "window", {
		enumerable: false,
		set: value => { setSVGWindow(value); },
	});

	return svg;

}));

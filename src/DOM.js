import vkbeautify from "../lib/vkbeautify";

export const removeChildren = function(parent) {
	while (parent.lastChild) {
		parent.removeChild(parent.lastChild);
	}
};

export const getWidth = function(svg) {
	let w = parseInt(svg.getAttributeNS(null, "width"));
	return w != null && !isNaN(w) ? w : svg.getBoundingClientRect().width;
}

export const getHeight = function(svg) {
	let h = parseInt(svg.getAttributeNS(null, "height"));
	return h != null && !isNaN(h) ? h : svg.getBoundingClientRect().height;
}

const getClassList = function(xmlNode) {
	let currentClass = xmlNode.getAttribute("class");
	return (currentClass == null
		? []
		: currentClass.split(" ").filter((s) => s !== ""));
};

export const addClass = function(xmlNode, newClass) {
	if (xmlNode == null) {
		return;
	}
	let classes = getClassList(xmlNode)
		.filter(c => c !== newClass);
	classes.push(newClass);
	xmlNode.setAttributeNS(null, "class", classes.join(" "));
	return xmlNode;
};

export const removeClass = function(xmlNode, removedClass) {
	if (xmlNode == null) {
		return;
	}
	let classes = getClassList(xmlNode)
		.filter(c => c !== removedClass);
	xmlNode.setAttributeNS(null, "class", classes.join(" "));
	return xmlNode;
};

export const setClass = function(xmlNode, className) {
	xmlNode.setAttributeNS(null, "class", className);
	return xmlNode;
}

export const setID = function(xmlNode, idName) {
	xmlNode.setAttributeNS(null, "id", idName);
	return xmlNode;
}

/**
 * import, export
 */

export const save = function(svg, filename = "image.svg") {
	let a = document.createElement("a");
	let source = (new window.XMLSerializer()).serializeToString(svg);
	let formatted = vkbeautify.xml(source);
	let blob = new window.Blob([formatted], {type: "text/plain"});
	a.setAttribute("href", window.URL.createObjectURL(blob));
	a.setAttribute("download", filename);
	document.body.appendChild(a);
	a.click();
	a.remove();
};

const parseCSSText = function(styleContent) {
	let styleElement = document.createElement("style");
	styleElement.textContent = styleContent;
	document.body.appendChild(styleElement);
	let rules = styleElement.sheet.cssRules;
	document.body.removeChild(styleElement);
	return rules;
};

/** parser error to check against */
const pErr = (new window.DOMParser())
	.parseFromString("INVALID", "text/xml")
	.getElementsByTagName("parsererror")[0]
	.namespaceURI;

// the SVG is returned, or given as the argument in the callback(svg, error)
export const load = function(input, callback) {
	// try cascading attempts at different possible param types
	// "input" is either a (1) raw text encoding of the svg
	//   (2) filename (3) already parsed DOM element
	if (typeof input === "string" || input instanceof String) {
		// (1) raw text encoding
		let xml = (new window.DOMParser()).parseFromString(input, "text/xml");
		if (xml.getElementsByTagNameNS(pErr, "parsererror").length === 0) {
			let parsedSVG = xml.documentElement;
			if (callback != null) {
				callback(parsedSVG);
			}
			return parsedSVG;
		}
		// (2) filename
		fetch(input)
			.then((response) => response.text())
			.then((str) => (new window.DOMParser())
				.parseFromString(str, "text/xml")
			).then((svgData) => {
				let allSVGs = svgData.getElementsByTagName("svg");
				if (allSVGs == null || allSVGs.length === 0) {
					throw "error, valid XML found, but no SVG element";
				}
				if (callback != null) {
					callback(allSVGs[0]);
				}
				return allSVGs[0];
			// }).catch((err) => callback(null, err));
			});
	} else if (input instanceof Document) {
		// (3) already parsed SVG... why would this happen? just return it
		callback(input);
		return input;
	}
};

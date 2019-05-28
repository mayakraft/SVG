
let DOMParser = (typeof window === "undefined" || window === null)
  ? undefined
  : window.DOMParser;
if (typeof DOMParser === "undefined" || DOMParser === null) {
  DOMParser = require("xmldom").DOMParser;
}

let XMLSerializer = (typeof window === "undefined" || window === null)
  ? undefined
  : window.XMLSerializer;
if (typeof XMLSerializer === "undefined" || XMLSerializer === null) {
  XMLSerializer = require("xmldom").XMLSerializer;
}

let document = (typeof window === "undefined" || window === null)
  ? undefined
  : window.document;
if (typeof document === "undefined" || document === null) {
  document = new DOMParser()
    .parseFromString("<!DOCTYPE html><title>a</title>", "text/html");
}

export {
  DOMParser,
  XMLSerializer,
  document,
};

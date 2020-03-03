import findCoordinates from "./coordinates";
import flatten from "./flatten";

const textArguments = function (element, ...args) {
  const point = findCoordinates(...flatten(...args));
  const text = args.filter(a => typeof a === "string");
  if (text) {
    element.innerHTML = text;
  }
  if (point) {
    ["x", "y"].forEach((key, i) => element.setAttribute(key, point[i]));
  }
  return element;
};

export default textArguments;

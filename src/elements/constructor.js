import window from "../environment/window";
import svgNS from "../environment/namespace";
import Args from "./args";

const constructor = function (nodeName, ...args) {
  return Args(window.document.createElementNS(svgNS, nodeName), ...args);
};

export default constructor;

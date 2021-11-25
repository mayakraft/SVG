/**
 * SVG (c) Robby Kraft
 */
import * as K from "../environment/keys";

const getAttr = (element) => {
  const t = element.getAttribute(K._transform);
  return (t == null || t === "") ? undefined : t;
}

const methods = {
  clearTransform: (el) => { el.removeAttribute(K._transform); return el; }
};

["translate", "rotate", "scale", "matrix"].forEach(key => {
  methods[key] = (element, ...args) => element.setAttribute(
    K._transform,
    [getAttr(element), `${key}(${args.join(" ")})`]
      .filter(a => a !== undefined)
      .join(" "));
});

export default methods;

/**
 * SVG (c) Robby Kraft
 */

import K from "../../environment/keys";

const getTransform = (element) => {
  const trans = element.getAttribute(K.transform);
  return (trans == null ? [] : trans.split(" "));
};

const transforms = {
  clearTransforms: (el) => { el.setAttribute(K.transform, ""); return el; }
};

["translate", "rotate", "scale"].forEach(key => {
  transforms[key] = function (element, ...args) {
    const transform = getTransform(element);
    transform.push(`${key}(${args.join(", ")})`);
    element.setAttribute(K.transform, transform.join(" "));
    return element;
  };
});

export default transforms;


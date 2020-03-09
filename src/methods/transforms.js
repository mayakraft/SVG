/**
 * SVG (c) Robby Kraft
 */

import K from "../environment/keys";

const getAttr = (element) => {
  const t = element.getAttribute(K.transform);
  return (t == null || t === "") ? undefined : t;
}

const transforms = {
  clearTransform: (el) => { el.removeAttribute(K.transform); return el; }
};

["translate", "rotate", "scale", "matrix"].forEach(key => {
  transforms[key] = function (element, ...args) {
    element.setAttribute(K.transform, [
        getAttr(element),
        `${key}(${args.join(" ")})`
      ].filter(a => a !== undefined).join(" ")
    );
    return element;
  };
});

export default transforms;

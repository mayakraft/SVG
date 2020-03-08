/**
 * SVG (c) Robby Kraft
 */

import K from "../../environment/keys";

const transforms = {
  clearTransform: (el) => { el.removeAttribute(K.transform); return el; }
};

["translate", "rotate", "scale", "matrix"].forEach(key => {
  transforms[key] = function (element, ...args) {
    element.setAttribute(K.transform, [
        element.getAttribute(K.transform),
        `${key}(${args.join(" ")})`
      ].filter(a => a != null).join(" ")
    );
    return element;
  };
});

export default transforms;

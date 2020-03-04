/**
 * SVG (c) Robby Kraft
 */

const ATTR = "transform";

const getTransform = (element) => {
  const trans = element.getAttribute(ATTR);
  return (trans == null ? [] : trans.split(" "));
};

const transforms = {
  clearTransforms: (el) => { el.setAttribute(ATTR, ""); return el; }
};

["translate", "rotate", "scale"].forEach(key => {
  transforms[key] = function (element, ...args) {
    const transform = getTransform(element);
    transform.push(`${key}(${args.join(", ")})`);
    element.setAttribute(ATTR, transform.join(" "));
    return element;
  };
});

export default transforms;


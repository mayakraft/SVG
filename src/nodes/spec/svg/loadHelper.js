import K from "../../../environment/keys";
import Load from "../../../file/load";
import DOM from "../../../methods/dom";

export const clear = function (element) {
  Array.from(element.attributes)
    .filter(a => a !== "xmlns")
    .forEach(attr => element.removeAttribute(attr.name));
  DOM.removeChildren(element);
};

export const assignSVG = function (target, source) {
  clear(target);
  Array.from(source.childNodes).forEach((node) => {
    source.removeChild(node);
    target.appendChild(node);
  });
  Array.from(source.attributes)
    .forEach(attr => target.setAttribute(attr.name, attr.value));
};

// check if the loader is running synchronously or asynchronously
export const loadHelper = function (target, data) {
  const result = Load(data);
  if (result == null) { return; }
  return (typeof result.then === K.function)
    ? result.then(svg => assignSVG(target, svg))
    : assignSVG(target, result);
};

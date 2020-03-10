import K from "../../../environment/keys";


export const setArrowPoints = function (el, ...args) {
  const children = Array.from(el.childNodes);
  const path = children.filter(node => node.tagName === "path").shift();
  const polys = ["svg-arrow-head", "svg-arrow-tail"]
    .map(c => children.filter(n => n.getAttribute("class") === c).shift());

  // draw
  // if straight or curved
  path.setAttribute("d", buildArrow(...args));

  if (o.head.visible) {
    polys[0].removeAttribute("display");
    setPoints(polys[0], headPolyPts);
  } else {
    polys[0].setAttribute("display", "none");
  }

  if (o.tail.visible) {
    polys[1].removeAttribute("display");
    setPoints(polys[1], tailPolyPts);
  } else {
    polys[1].setAttribute("display", "none");
  }
  return el;
};

export const attachArrowMethods = function (element) {
  element.head = (options) => {
    if (typeof options === K.object) {
      Object.assign(element.options.head, options);
      if (options.visible === undefined) {
        element.options.head.visible = true;
      }
    } else if (typeof options === K.boolean) {
      element.options.head.visible = options;
    } else if (options == null) {
      element.options.head.visible = true;
    }
    setArrowPoints(element);
    return element;
  };
  element.tail = (options) => {
    if (typeof options === K.object) {
      Object.assign(element.options.tail, options);
      if (options.visible === undefined) {
        element.options.tail.visible = true;
      }
      element.options.tail.visible = true;
    } else if (typeof options === K.boolean) {
      element.options.tail.visible = options;
    } else if (options == null) {
      element.options.tail.visible = true;
    }
    setArrowPoints(element);
    return element;
  };
  element.curve = (amount) => {
    element.options.curve = amount;
    setArrowPoints(element);
    return element;
  };
  element.pinch = (amount) => {
    element.options.pinch = amount;
    setArrowPoints(element);
    return element;
  };
};

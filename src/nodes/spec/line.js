/**
 * SVG (c) Robby Kraft
 */
import flatten from "../../arguments/flatten";
import semi_flatten from "../../arguments/semi-flatten";
import coordinates from "../../arguments/coordinates";
import attributes from "../../attributes/singleElements";

const Args = (...args) => coordinates(...semi_flatten(...args)).slice(0, 4);

const setPoints = (element, ...args) => { Args(...args)
  .forEach((value, i) => element.setAttribute(attributes.line[i], value)); return element; }

export default {
  line: {
    args: Args,
    methods: {
      setPoints,
    }
  }
};

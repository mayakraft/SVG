/**
 * SVG (c) Robby Kraft
 */

import K from "../../environment/keys";
import { sync } from "../../file/load";
import { moveChildren } from "../../methods/dom";

const loadGroup = (group, ...sources) => {
  const elements = sources.map(source => sync(source))
    .filter(a => a !== undefined);
  elements.filter(element => element.tagName === K.svg)
    .forEach(element => moveChildren(group, element));
  elements.filter(element => element.tagName !== K.svg)
    .forEach(element => group.appendChild(element));
  return group;
};

export default {
  g: {
    init: loadGroup,
    methods: {
      load: loadGroup,
    }
  }
};

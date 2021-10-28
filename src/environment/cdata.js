/**
 * SVG (c) Robby Kraft
 */
import window from "./window";

const cdata = (textContent) => (new window.DOMParser())
  .parseFromString("<root></root>", "text/xml")
  .createCDATASection(`${textContent}`);

export default cdata;

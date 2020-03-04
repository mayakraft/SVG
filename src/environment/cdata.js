/**
 * SVG (c) Robby Kraft
 */

const cdata = (textContent) => (new window.DOMParser())
  .parseFromString("<root></root>", "text/xml")
  .createCDATASection(`${textContent}`);

export default cdata;
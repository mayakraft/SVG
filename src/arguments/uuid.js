/**
 * SVG (c) Robby Kraft
 */
export default () => Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .concat("aaaaa")
  .substr(0, 5);

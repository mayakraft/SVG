/**
 * SVG (c) Robby Kraft
 */

// todo, verify this will always return length 5
export default () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

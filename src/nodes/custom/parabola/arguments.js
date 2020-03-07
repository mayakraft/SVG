/**
 * SVG (c) Robby Kraft
 */

const COUNT = 128;

const parabolaArguments = (x, y, width, height) => Array
  .from(Array(COUNT + 1))
  .map((_, i) => (i - (COUNT)) / COUNT * 2 + 1)
  .map(i => [
    x + (i + 1) * width * 0.5,
    y + (i ** 2) * height
  ]);

export default parabolaArguments;

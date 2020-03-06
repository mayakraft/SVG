/**
 * SVG (c) Robby Kraft
 */

const parabolaArguments = (x, y, width, height) => {
  const COUNT = 128;
  const iter = Array.from(Array(COUNT + 1))
    .map((_, i) => (i - (COUNT)) / COUNT * 2 + 1);
  const ptsX = iter.map(i => x + (i + 1) * width * 0.5);
  const ptsY = iter.map(i => y + (i ** 2) * height);
  return iter.map((_, i) => [ptsX[i], ptsY[i]]);
};

export default parabolaArguments;

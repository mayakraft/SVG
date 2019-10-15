/**
 * SVG (c) Robby Kraft
 */

import SimplexNoise from "../../include/simplex-noise";

const Noise = new SimplexNoise();

export const noise = function (...args) {
  switch (args.length) {
    case 1: return Noise.noise2D(...args, 0);
    case 2: return Noise.noise2D(...args);
    case 3: return Noise.noise3D(...args);
    case 4: return Noise.noise4D(...args);
    default: return 0;
  }
};

export const random = function (a, b) {
  if (b != null) {
    return Math.random() * (b - a) + a;
  }
  if (a != null) {
    return Math.random() * a;
  }
  return Math.random();
};

export const randomInt = function (a, b) {
  return Math.floor(random(a, b));
};

export const {
  PI
} = Math;

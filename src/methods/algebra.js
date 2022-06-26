/**
 * SVG (c) Kraft
 */
export const svg_magnitudeSq2 = (a) => (a[0] ** 2) + (a[1] ** 2);
export const svg_magnitude2 = (a) => Math.sqrt(svg_magnitudeSq2(a));
export const svg_distanceSq2 = (a, b) => svg_magnitudeSq2(svg_sub2(a, b));
export const svg_distance2 = (a, b) => Math.sqrt(svg_distanceSq2(a, b));
export const svg_add2 = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const svg_sub2 = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const svg_scale2 = (a, s) => [a[0] * s, a[1] * s];

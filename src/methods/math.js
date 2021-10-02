/**
 * SVG (c) Robby Kraft
 */

export const magnitudeSq2 = (a) => (a[0] ** 2) + (a[1] ** 2);
export const magnitude2 = (a) => Math.sqrt(magnitudeSq2(a));
export const distanceSq2 = (a, b) => magnitudeSq2(sub2(a, b));
export const distance2 = (a, b) => Math.sqrt(distanceSq2(a, b));
export const add2 = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const sub2 = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const scale2 = (a, s) => [a[0] * s, a[1] * s];

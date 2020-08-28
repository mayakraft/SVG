/**
 * SVG (c) Robby Kraft
 */

export const distanceSq2 = (a, b) => ((a[0] - b[0]) ** 2) + ((a[1] - b[1]) ** 2);
export const distance2 = (a, b) => Math.sqrt(distanceSq2(a, b));

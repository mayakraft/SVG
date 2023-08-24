/**
 * SVG (c) Kraft
 */
export const svg_add2 = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const svg_sub2 = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const svg_scale2 = (a, s) => [a[0] * s, a[1] * s];
export const svg_magnitudeSq2 = (a) => (a[0] ** 2) + (a[1] ** 2);
export const svg_magnitude2 = (a) => Math.sqrt(svg_magnitudeSq2(a));
export const svg_distanceSq2 = (a, b) => svg_magnitudeSq2(svg_sub2(a, b));
export const svg_distance2 = (a, b) => Math.sqrt(svg_distanceSq2(a, b));
export const svg_polar_to_cart = (a, d) => [Math.cos(a) * d, Math.sin(a) * d];
export const svg_multiplyMatrices2 = (m1, m2) => [
	m1[0] * m2[0] + m1[2] * m2[1],
	m1[1] * m2[0] + m1[3] * m2[1],
	m1[0] * m2[2] + m1[2] * m2[3],
	m1[1] * m2[2] + m1[3] * m2[3],
	m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
	m1[1] * m2[4] + m1[3] * m2[5] + m1[5],
];

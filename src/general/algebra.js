/**
 * Rabbit Ear (c) Kraft
 */

/** @param {[number, number]} a @param {[number, number]} b @returns {[number, number]} */
export const svg_add2 = (a, b) => [a[0] + b[0], a[1] + b[1]];

/** @param {[number, number]} a @param {[number, number]} b @returns {[number, number]} */
export const svg_sub2 = (a, b) => [a[0] - b[0], a[1] - b[1]];

/** @param {[number, number]} a @param {number} s @returns {[number, number]} */
export const svg_scale2 = (a, s) => [a[0] * s, a[1] * s];

/** @param {[number, number]} a */
export const svg_magnitudeSq2 = (a) => (a[0] ** 2) + (a[1] ** 2);

/** @param {[number, number]} a */
export const svg_magnitude2 = (a) => Math.sqrt(svg_magnitudeSq2(a));

/** @param {[number, number]} a @param {[number, number]} b */
export const svg_distanceSq2 = (a, b) => svg_magnitudeSq2(svg_sub2(a, b));

/** @param {[number, number]} a @param {[number, number]} b */
export const svg_distance2 = (a, b) => Math.sqrt(svg_distanceSq2(a, b));

/** @param {number} a @param {number} d @returns {[number, number]} */
export const svg_polar_to_cart = (a, d) => [Math.cos(a) * d, Math.sin(a) * d];

/** @param {number[]} m1 @param {number[]} m2 */
export const svg_multiplyMatrices2 = (m1, m2) => [
	m1[0] * m2[0] + m1[2] * m2[1],
	m1[1] * m2[0] + m1[3] * m2[1],
	m1[0] * m2[2] + m1[2] * m2[3],
	m1[1] * m2[2] + m1[3] * m2[3],
	m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
	m1[1] * m2[4] + m1[3] * m2[5] + m1[5],
];

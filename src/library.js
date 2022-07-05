/**
 * SVG (c) Kraft
 */
export const SVG_Constructor = {
	init: () => {},
};
/**
 * @name svg
 * @description Create an svg element, the object will be bound with instance
 * methods for creating children and styles.
 * @memberof svg
 * @param {Element} [parent=undefined] optional parent DOM element, this will append to.
 * @param {number} [width=undefined] optional width of viewBox (if present, include height)
 * @param {number} [height=undefined] optional height of viewBox (if present, include width)
 * @param {function} [callback=undefined] optional function which will be
 * executed upon completion of initialization.
 * @returns {Element} one svg DOM element
 * @example
 * var svg = ear.svg(document.body, 640, 480)
 * @example
 * ear.svg(640, 480, document.body, (svg) => {
 *   // window did load, and "svg" is scoped
 * })
 * @linkcode SVG ./src/library.js 24
 */
export default function () {
	return SVG_Constructor.init(...arguments);
}

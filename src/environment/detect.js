/**
 * SVG (c) Kraft
 */
import {
	str_undefined,
	str_object,
} from "./strings.js";

/**
 * @constant {boolean}
 * @note compare to "undefined", the string
 */
const isBrowser = typeof window !== str_undefined
	&& typeof window.document !== str_undefined;
/**
 * @constant {boolean}
 */
const isNode = typeof process !== str_undefined
	&& process.versions != null
	&& process.versions.node != null;
/**
 * @constant {boolean}
 */
const isWebWorker = typeof self === str_object
	&& self.constructor
	&& self.constructor.name === "DedicatedWorkerGlobalScope";

export {
	isBrowser,
	isNode,
	isWebWorker,
};

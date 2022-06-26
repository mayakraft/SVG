/**
 * SVG (c) Kraft
 */
import * as S from "./strings";

// compare to "undefined", the string
const isBrowser = typeof window !== S.str_undefined
	&& typeof window.document !== S.str_undefined;

const isNode = typeof process !== S.str_undefined
	&& process.versions != null
	&& process.versions.node != null;

const isWebWorker = typeof self === S.str_object
	&& self.constructor
	&& self.constructor.name === "DedicatedWorkerGlobalScope";

export {
	isBrowser,
	isNode,
	isWebWorker
};

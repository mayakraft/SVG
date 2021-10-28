/**
 * SVG (c) Robby Kraft
 */
import * as K from "./keys";

// compare to undefined, the string
const isBrowser = typeof window !== K._undefined
  && typeof window.document !== K._undefined;

const isNode = typeof process !== K._undefined
  && process.versions != null
  && process.versions.node != null;

const isWebWorker = typeof self === K.object
  && self.constructor
  && self.constructor.name === "DedicatedWorkerGlobalScope";

export {
  isBrowser,
  isNode,
  isWebWorker
};

/**
 * SVG (c) Robby Kraft
 */

import K from "./keys";

const isBrowser = typeof window !== K.undefined
  && typeof window.document !== K.undefined;

const isNode = typeof process !== K.undefined
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

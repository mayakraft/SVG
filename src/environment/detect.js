/**
 * SVG (c) Robby Kraft
 */
import * as S from "./strings";

export default {
// compare to "undefined", the string
  isBrowser: typeof window !== S.str_undefined
    && typeof window.document !== S.str_undefined,
  isNode: typeof process !== S.str_undefined
    && process.versions != null
    && process.versions.node != null,
  isWebWorker: typeof self === S.str_object
    && self.constructor
    && self.constructor.name === "DedicatedWorkerGlobalScope",
};

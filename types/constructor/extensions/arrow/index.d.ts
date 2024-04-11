declare namespace _default {
    namespace arrow {
        export let nodeName: string;
        export let attributes: any[];
        export function args(): any[];
        export { ArrowMethods as methods };
        export { init };
    }
}
export default _default;
import ArrowMethods from "./methods.js";
import init from "./init.js";

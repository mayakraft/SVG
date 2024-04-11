declare namespace _default {
    namespace arc {
        export { str_path as nodeName };
        export let attributes: string[];
        export { arcArguments as args };
        export let methods: {
            clearTransform: (el: any) => any;
            setArc: (el: any, ...args: any[]) => any;
        };
    }
}
export default _default;
import { str_path } from "../../../environment/strings.js";
declare function arcArguments(a: any, b: any, c: any, d: any, e: any): string[];

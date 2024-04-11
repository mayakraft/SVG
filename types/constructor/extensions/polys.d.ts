declare namespace _default {
    namespace polyline {
        export { Args as args };
        export let methods: {
            removeChildren: (element: any) => any;
            appendTo: (element: any, parent: any) => any;
            setAttributes: (element: any, attrs: any) => any;
            clearTransform: (el: any) => any;
            setPoints: (element: any, ...args: any[]) => any;
            addPoint: (element: any, ...args: any[]) => any;
        };
    }
    namespace polygon {
        export { Args as args };
        let methods_1: {
            removeChildren: (element: any) => any;
            appendTo: (element: any, parent: any) => any;
            setAttributes: (element: any, attrs: any) => any;
            clearTransform: (el: any) => any;
            setPoints: (element: any, ...args: any[]) => any;
            addPoint: (element: any, ...args: any[]) => any;
        };
        export { methods_1 as methods };
    }
}
export default _default;
declare function Args(...args: any[]): any[];

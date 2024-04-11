declare namespace _default {
    namespace mask {
        export { maskArgs as args };
        export let methods: {
            removeChildren: (element: any) => any;
            appendTo: (element: any, parent: any) => any;
            setAttributes: (element: any, attrs: any) => any;
            clearTransform: (el: any) => any;
        };
    }
    namespace clipPath {
        export { maskArgs as args };
        let methods_1: {
            removeChildren: (element: any) => any;
            appendTo: (element: any, parent: any) => any;
            setAttributes: (element: any, attrs: any) => any;
            clearTransform: (el: any) => any;
        };
        export { methods_1 as methods };
    }
    namespace symbol {
        export { maskArgs as args };
        let methods_2: {
            removeChildren: (element: any) => any;
            appendTo: (element: any, parent: any) => any;
            setAttributes: (element: any, attrs: any) => any;
            clearTransform: (el: any) => any;
        };
        export { methods_2 as methods };
    }
    namespace marker {
        export { maskArgs as args };
        let methods_3: {
            removeChildren: (element: any) => any;
            appendTo: (element: any, parent: any) => any;
            setAttributes: (element: any, attrs: any) => any;
            clearTransform: (el: any) => any;
            size: (element: any, ...args: any[]) => any;
            setViewBox: (element: any, ...args: any[]) => any;
        };
        export { methods_3 as methods };
    }
}
export default _default;
declare function maskArgs(...args: any[]): any[];

declare namespace _default {
    namespace line {
        export { Args as args };
        export let methods: {
            removeChildren: (element: any) => any;
            appendTo: (element: any, parent: any) => any;
            setAttributes: (element: any, attrs: any) => any;
            clearTransform: (el: any) => any;
            setPoints: (element: any, ...args: any[]) => any;
        };
    }
}
export default _default;
declare function Args(...args: any[]): any[];

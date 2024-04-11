declare namespace _default {
    namespace path {
        export { path_methods as methods };
    }
}
export default _default;
declare const path_methods: {
    removeChildren: (element: any) => any;
    appendTo: (element: any, parent: any) => any;
    setAttributes: (element: any, attrs: any) => any;
    clearTransform: (el: any) => any;
    addCommand: (el: any, command: any, ...args: any[]) => any;
    appendCommand: (el: any, command: any, ...args: any[]) => any;
    clear: (element: any) => any;
    getCommands: (element: any) => {
        command: string;
        values: number[];
    }[];
    get: (element: any) => {
        command: string;
        values: number[];
    }[];
    getD: (el: any) => any;
};

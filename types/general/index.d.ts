declare const _default: {
    setViewBox: (element: any, ...args: any[]) => any;
    getViewBox: (element: any) => any;
    convertToViewBox: (svg: any, x: any, y: any) => any[];
    foldToViewBox: ({ vertices_coords }: {
        vertices_coords: any;
    }) => string;
    parseTransform: (transform: string) => {
        transform: string;
        parameters: number[];
    }[];
    transformStringToMatrix: (string: any) => any;
    pathCommandNames: {
        m: string;
        l: string;
        v: string;
        h: string;
        a: string;
        c: string;
        s: string;
        q: string;
        t: string;
        z: string;
    };
    parsePathCommands: (d: string) => {
        command: string;
        values: number[];
    }[];
    parsePathCommandsWithEndpoints: (d: any) => {
        end: any;
        start: any;
        command: string;
        values: number[];
    }[];
    makeCDATASection: (text: string) => CDATASection;
    xmlStringToElement: (input: string, mimeType?: string) => Element;
    getRootParent: (el: Element) => Element;
    findElementTypeInParents: (element: Element, nodeName: string) => Element;
    addClass: (el: Element, ...classes: string[]) => void;
    flattenDomTree: (el: Element | ChildNode) => (Element | ChildNode)[];
    flattenDomTreeWithStyle: (element: Element | ChildNode, attributes?: any) => {
        element: Element | ChildNode;
        attributes: any;
    }[];
    svg_add2: (a: [number, number], b: [number, number]) => [number, number];
    svg_sub2: (a: [number, number], b: [number, number]) => [number, number];
    svg_scale2: (a: [number, number], s: number) => [number, number];
    svg_magnitudeSq2: (a: [number, number]) => number;
    svg_magnitude2: (a: [number, number]) => number;
    svg_distanceSq2: (a: [number, number], b: [number, number]) => number;
    svg_distance2: (a: [number, number], b: [number, number]) => number;
    svg_polar_to_cart: (a: number, d: number) => [number, number];
    svg_multiplyMatrices2: (m1: number[], m2: number[]) => number[];
};
export default _default;

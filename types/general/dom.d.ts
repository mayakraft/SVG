export function xmlStringToElement(input: string, mimeType?: string): Element | null;
export function getRootParent(el: Element): Element;
export function findElementTypeInParents(element: Element, nodeName: string): Element | null;
export function addClass(el: Element, ...classes: string[]): void;
export function flattenDomTree(el: Element | ChildNode): (Element | ChildNode)[];
export function flattenDomTreeWithStyle(element: Element | ChildNode, attributes?: object): {
    element: Element | ChildNode;
    attributes: object;
}[];

export namespace pathCommandNames {
    let m: string;
    let l: string;
    let v: string;
    let h: string;
    let a: string;
    let c: string;
    let s: string;
    let q: string;
    let t: string;
    let z: string;
}
export function parsePathCommands(d: string): {
    command: string;
    values: number[];
}[];
export function parsePathCommandsWithEndpoints(d: any): {
    end: any;
    start: any;
    command: string;
    values: number[];
}[];

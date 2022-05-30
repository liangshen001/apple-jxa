export declare function runJXACode<R>(jxaCode: string): Promise<R>;
export declare function run<R, U extends any[]>(jxaCodeFunction: (...args: U) => R, ...args: U): Promise<R>;

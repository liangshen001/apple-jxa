import {Properties} from "./properties";


export type ObjectSpecifierConstructor<T extends JXASpecifier> = {
    new(properties: Partial<Properties<T>>): T
    (properties: Partial<Properties<T>>): T
}
// export type JXASpecifier<N = string, T = {}> =
//     (T extends (string | number | boolean) ?
//         {(): T} : {[K in keyof T]: T[K]}) & {_: N}

export interface JXASpecifier<N = string, T = this> {
    (): T
    _: N
}
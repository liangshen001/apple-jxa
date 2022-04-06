import {JXAArraySpecifier} from "./array-specifier";
import {JXASpecifier} from "./specifier";

/**
 * 获取给定JXA对象所包含数组元素类型的名字
 */
// export type JXAType<T = string> = Exclude<{
//     [K in keyof T]: T[K] extends JXAArraySpecifier<infer E, infer N> ? N : never
// }[keyof T], undefined>


export type EachElementsType<T extends JXASpecifier> = Exclude<{
    [K in keyof T]: T[K] extends JXAArraySpecifier<infer E> ? E : never
}[keyof T], undefined>
//
//
// export type JXAType<T = any> = T extends JXASpecifier<infer E, infer N> ? N : never

export type JXAType<T = unknown> = T extends JXASpecifier<infer N, infer E> ? N : string


/**
 * ObjectSpecifier对象转成简单的JS对象 可用于数组匹配 构造参数
 */
import {JXASpecifier} from "./specifier";
import {JXAArraySpecifier} from "./array-specifier";

export type Properties<E extends JXASpecifier> = {
    [K in keyof E]?: E[K] extends (() => infer U) ?
        (U extends (string | number | boolean) ? U : Properties<U>) :
        E[K] extends JXAArraySpecifier<infer T> ? Properties<T>[] : never
}

import {JXASpecifier} from "./specifier";
import {JXAType} from "./type";
import {Properties} from "./properties";

/**
 * whose或where中的查询条件
 * 例：
 *  whose({ name: { _equals: 'finder name' } })
 *  whose({ name: 'finder name' })
 *  whose({ _or: [{ _equals: 'finder name' }, { _equals: 'finder name2' }] })
 *  whose({ _and: [{ _not: 'finder name3' }, { _not: 'finder name2' }] })
 */
export type QueryCriteria<E, O = Properties<E>> = {
    [K in keyof O]?: ValueMatches<O[K]>
} & {
    _match?: [] // E[K], ValueMatches<O[K]>
    _and?: QueryCriteria<E>[]
    _or?: QueryCriteria<E>[]
    _not?: QueryCriteria<E>[]
}

/**
 * 条件过滤相关方法
 */
export type ValueMatches<V> = V | { _equals: V } | { '=': V } | { _contains: V } | { _beginsWith: V } | { _endsWith: V }
    | { _greaterThan: V } | { '>': V } | { _greaterThanEquals: V } | { '>=': V } | { _lessThan: V } | { '<': V }
    | { _lessThanEquals: V } | { '<=': V }
/**
 * 过滤数组
 */
export type FilteringArrays<E> = {
    whose: (p: QueryCriteria<E>) => JXAArraySpecifier<E>
    where: (p: QueryCriteria<E>) => JXAArraySpecifier<E>
}
/**
 * 数组查询元素方法
 */
export type ElementArrays<E> = {
    byName: (name: string) => E
    byId: (id: string) => E
    at: (index: number) => E
    push: (obj: E) => number
    [index: number]: E
    [name: string]: E
    length: number
}

export type MappingArrays<E, O = Properties<E>> = {
    [K in keyof O]: () => Array<O[K]>
}

// export type ArraySpecifier<E> =
//     (FilteringArrays<E> & ElementArrays<E> & MappingArrays<E>)

/**
 * JXA数组类型
 * E：元素类型
 * N：元素类型的名字
 */
export interface JXAArraySpecifier<E> extends FilteringArrays<E>, ElementArrays<E>, MappingArrays<E> {
    (): E[];
}

export type RespondsTo<A, C extends keyof A> = {
    [K in C]: (A[K] extends ((d: this, o: infer O) => infer R)
        ? (
            // 如果第二个参数为空 则无参数
            // O extends undefined ? (() => R) : (O extends {} ? ((option: O) => R) : (() => R))
            (O extends {} ? ((option?: O) => R) : (() => R))// & (O extends undefined ? ((option?: O) => R) : void)
            // (O extends {} ? (O extends undefined ? void : ((option?: O) => R)) : (() => R))// & (O extends undefined ? ((option?: O) => R) : void)
            ) : never)
}
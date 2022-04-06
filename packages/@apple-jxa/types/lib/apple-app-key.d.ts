
export type AppleAppKey<A> = `/Applications/${A}.app` | `com.apple.${Uncapitalize<A>}` | `${Capitalize<A>}`
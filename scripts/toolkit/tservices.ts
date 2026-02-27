export type Exact<A, B> =
    A extends B ? B extends A
        ? A
        : never
    : never

export type ValueOf<T> = T[keyof T]

export type NonFunctionKeys<T> = {
    [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

export type NonFunctionValues<T> = T[NonFunctionKeys<T>]

export type union = <
    const T extends readonly unknown[]
>(...values: T) => T[number];

export type _as = <T, U extends T>(Type: T, obj: U) => U;

export type _callable = <
    const T extends readonly unknown[],
    U
>(
    args: T,
    ret: U
) => (...arg: [...T]) => U

export type _tuple = <
    const T extends readonly unknown[],
>(...args: T) => T;

export type StructType<
    T,
    K extends readonly (keyof T)[]
> = {
    shape: T
    keys: K
}

export type MergeStruct<
    A extends StructType<any, any>,
    B extends StructType<any, any>
> =
    A extends StructType<infer TA, infer KA>
        ? B extends StructType<infer TB, infer KB>
            ? StructType<
                TA & TB,
                [...KA, ...KB]
              >
            : never
        : never

export type FactoryType<
    T,
    K extends readonly (keyof T)[]
> = {
    new: (
        ...args: {
            [I in keyof K]:
                K[I] extends keyof T
                    ? T[K[I]]
                    : never
        }
    ) => T
}
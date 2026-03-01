// [26.02.28]

export type t_literal = <
    const T extends unknown,
>(...values: T[]) => T;

export type t_type = <
    const T
>(obj: T) => T;

export type t_any = any;
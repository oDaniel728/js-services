export type tEventInstance<
    T extends readonly unknown[]
> = {
    invoked: boolean,
    callbacks: Set<(...args: T) => void>

    connect: (cb: (...arg: T) => void) => void,
    once: (cb: (...arg: T) => void) => void,
    wait: () => Promise<T>,

    emit: (...arg: T) => void,
};
export type tEvent = {
    new: <
        const T extends readonly unknown[]
    >(...args: T) => tEventInstance<T>
}
export declare function hook(): void;
export declare const Event: tEvent;
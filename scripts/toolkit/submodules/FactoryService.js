// @ts-check

/**
 * @template T
 * @template {readonly (keyof T)[]} K
 * @typedef {import("../tservices").StructType<T, K>} StructType
 */

/**
 * @template T
 * @template {readonly (keyof T)[]} K
 * @typedef {import("../tservices").FactoryType<T, K>} FactoryType
 */

export const Struct = {

    /** @type { import("../tservices").StructGenerator } */
    new(keys, shape) {
        return { keys, shape };
    },

    /**
     * B herda A
     * @template {StructType<any, any>} A
     * @template {StructType<any, any>} B
     * @param {A} a
     * @param {B} b
     * @returns {import("../tservices").MergeStruct<A, B>}
     */
    inherits(a, b) {

        // @ts-ignore
        return {
            keys: [...a.keys, ...b.keys],
            shape: Object.assign(
                Object.create(a.shape),
                b.shape
            )
        };
    }
};

export const Factory = {

    /** @type { import("../tservices").FactoryGenerator } */
    new(struct) {

        const { keys, shape } = struct;

        return {
            new(...args) {

                const instance = Object.create(shape);

                keys.forEach((key, index) => {
                    // @ts-ignore
                    instance[key] = args[index];
                });

                return instance;
            },
        };
    }
};
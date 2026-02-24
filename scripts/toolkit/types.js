// @ts-check

/**
 * @template T 
 * @typedef {T[keyof T]} ValueOf
 */

export const string = /** @type {string} */ ("");

export const number = /** @type {number} */ (0);

export const boolean = /** @type {boolean} */ (true);

export const null_ = /** @type {null} */ (null);

export const any = union([string, number, boolean, null_, Object, Array]);

export const void_ = /** @type {void} */ (undefined);

export const voidCallable = () => void_;

/**
 * Cria um tipo lista
 * @template T
 * @param {T} Type
 * @returns {T[]}
 */
export function list(Type) {
    return [Type];
}

/**
 * Cria um tipo record
 * @template T, U
 * @param {T} KeyType
 * @param {U} ValueType
 * @returns {Record<T, U>}
 */
export function dict(KeyType, ValueType) {
    // @ts-ignore
    return { [KeyType]: ValueType };
}

/**
 * @template T
 * @param {readonly T[]} values
 * @returns {T}
 */
export function literal(...values) {
    return values[0];
}

/**
 * Cria uma lista das chaves de um objeto
 * @template {Object} T
 * @param {T} object
 * @returns {keyof T}
 */
export function keysof(object) {
    // @ts-ignore
    return Object.keys(object);
}

/**
 * Faz a verificação de um tipo
 * @template T
 * @template {T} U
 * @param {T} Type
 * @param {U} value
 * @returns {U}
 */
export function field(Type, value) {
    return value;
}

/**
 * Cria um tipo union a partir de vários tipos/valores
 * @template U
 * @param {readonly U[]} values
 * @returns {U}
 */
export function union(values) {
    return values[0];
}

/**
 * Intersecta dois tipos
 *
 * @template T, U
 * @param {T} self 
 * @param {U} other 
 * @returns {T & U}
 */
export function intersect(self, other) {
    return {...self, ...other}
}

/**
 * Cria uma tupla preservando os tipos literais
 *
 * @template {typeof any[]} T
 * @param {T} args
 * @returns {T}
 */
export function tuple(...args) {
    // @ts-ignore
    return args;
}



/**
 * Cria um callable
 *
 * @template {typeof any[]} T
 * @template {typeof any} U
 * @param { T } args
 * @param { U } ret 
 * @returns {(...arg: T) => U} 
 */
export function callable(args, ret) {
    return (...args) => ret;
}

/**
 * Cria um método tipado
 *
 * @template { typeof any[] } T
 * @template { typeof any   } U
 * @param { (...arg: T) => U } type 
 * @param { (...arg: T) => U } callback 
 * @returns { (...arg: T) => U } 
 */
export function method(type, callback) {
    return callback;
}

/**
 * Cria uma struct tipada
 * 
 * @template {Record<string, any>} T
 * @param {T} obj
 * @returns {new (...args: { [K in keyof T]: T[K] }) => T}
 */
export function struct(obj) {
    const keys = Object.keys(obj);

    return /** @type {any} */ (class {
        // @ts-ignore
        constructor(...args) {
            keys.forEach((key, i) => {
                // @ts-ignore
                this[key] = args[i];
            });
        }
    });
}

/**
 * Retorna o tipo de um objeto
 *
 * @template {typeof any | Record<string, any>} T
 * @param {T} obj 
 * @returns {T} 
 */
export function type(obj) {
    return obj;
}

/**
 * Validates a type
 *
 * @template {typeof any | Record<string, any>} T
 * @template {T} U
 * @param {T} Type 
 * @param {U} obj
 * @returns {U}
 */
export function as(Type, obj) {
    return obj
}

/**
 * Faz com que T|null vire T
 *
 * @template T
 * @param {T | null} object 
 * @returns {T} 
 */
export function notnull(object) {
    // @ts-ignore
    return object
}


/**
 * Cria um Optional[T]
 *
 * @template { typeof any } T
 * @param {T} object 
 * @returns {T?} 
 */
export function optional(object) {
    return object;
}


/**
 * Trava todas as entradas de um objeto
 *
 * @template { Record<string, any> } T
 * @param { T } object 
 * @returns { Readonly<T> }
 */
export function lock(object) {
    return object;
}


/**
 * Remove os tipos de uma union
 *
 * @template T, U
 * @param {T} union_ 
 * @param {U} types_
 * @returns {Exclude<T, U>} 
 */
export function exclude(union_, types_) {
    // @ts-ignore
    return union_;
}
/**
 * Remove os tipos de uma union
 *
 * @template T, U
 * @param {T} union_ 
 * @param {U} types_
 * @returns {Extract<T, U>} 
 */
export function extract(union_, types_) {
    // @ts-ignore
    return union_;
}

/**
 * Pega os parametros de uma função (hint)
 *
 * @template {(...args: any) => any} T
 * @param {T} func
 * @returns {Parameters<T>} 
 */
export function parameters(func) {
    // @ts-ignore
    return null;
}


/**
 * Cria um objeto(pq sim)
 *
 * @template {Record<string, any>} T
 * @param {T} object
 * @returns {T}
 */
export function object(object) {
    return /** @type {T} */(object);
}


/**
 * Força o tipo(hint)
 *
 * @template {any} T
 * @param {T} Type 
 * @param {any} object 
 * @returns {T}
 */
export function cast(Type, object) {
    return object
}
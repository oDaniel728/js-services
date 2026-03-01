// @ts-check

/**
 * @template T 
 * @typedef { T[keyof T] } ValueOf
 */
/**
 * @template T
 * @typedef { new(...args: any[]) => T } ClassOf
 */

export const string = /** @type {string} */ ("");

export const number = /** @type {number} */ (0);

export const boolean = /** @type {boolean} */ (false);

export const null_ = /** @type {null} */ (null);

export const any = /** @type {import("./ttyping").t_any} */ (null);

export const void_ = /** @type {void} */ (undefined);

export const Enum = {
    baseTypes: {
        string: "string",
        number: "number",
        boolean: "boolean",
        null: "null",
        void: "void",
        undefined: "undefined",
        any: "any",

        array: "array",
        object: "object"
    }
};
/**
 * @typedef {keyof typeof Enum.baseTypes} baseTypes
 */

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
 * Cria um tipo literal
 * @type { import("./ttyping").t_literal }
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
 * @type {import("./tservices").union}
 * @version 26.02.26.1
 */
export function union(...values) {
    // @ts-ignore
    return null;
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
 * @type {import("./tservices")._tuple}
 */
export function tuple(...args) {
    // @ts-ignore
    return args;
}



// @ts-check

/**
 * Cria um callable
 * @type {import("./tservices")._callable}
 */
export function callable(args, ret) {
    return (...args) => ret
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
 * @type { import("./ttyping").t_type }
 */
export function type(obj) {
    return obj;
}

/**
 * Cria um objeto a partir de um tipo
 * @type {import("./tservices")._as}
 */
export function as(Type, obj) {
    return obj
}

/**
 * Cria um objeto a partir de um tipo
 * @type { typeof as }
 */
const make = as

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
 * @template { unknown } T
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
 * @template {typeof any} T
 * @template {T} U
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
 * @template {typeof any} T
 * @template {T} U
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
 * @type { import("./ttyping").t_object }
 */
export function object(object) {
    return (object);
}



/**
 * Força o tipo(hint)
 *
 * @template { any } T
 * @param { new(...args: any[]) => T | T } Type 
 * @param { any } object 
 * @returns { T }
 * @since 26.02.23
 */
export function cast(Type, object) {
    return object
}

/**
 * Cria um struct com os valores padrão
 *
 * @template {Record<string, any>} T
 * @param { T } structure - objeto que define os tipos de cada propriedade
 * @param { Record<keyof typeof Enum.baseTypes, any> } map - mapeamento de tipos para valores padrão
 * @returns { T } - objeto preenchido com valores padrão
 */
export function createDefault(structure, map) {
    /** @type {Record<string, any>} */
    const out = {};

    for (const key in structure) {
        const type = structure[key];
        let value;

        // Verifica se é array
        if (Array.isArray(type)) {
            value = map.array ?? [];
        }
        // Verifica se é objeto (não array e não null)
        else if (type !== null && typeof type === "object") {
            value = map.object ?? {};
        }
        // Caso seja tipo primitivo
        else {
            switch (type) {
                case string:
                    value = map.string ?? "";
                    break;
                case number:
                    value = map.number ?? 0;
                    break;
                case boolean:
                    value = map.boolean ?? true;
                    break;
                case null_:
                    value = map.null ?? null;
                    break;
                case any:
                    value = map.any ?? 0;
                    break;
                case void_:
                case undefined:
                    value = map.void ?? undefined;
                    break;
                default:
                    value = undefined;
                    break;
            }
        }

        out[key] = value;
    }

    return /** @type {T} */ (out);
}


/**
 * Retorna o value como função pra ser usado como gerador
 *
 * @template T
 * @param {T} value 
 * @returns {() => T} 
 */
export function generator(value) {
    return () => value;
}

/**
 * Retorna nulo, mas um dia é cls
 *
 * @template T
 * @param {ClassOf<T>} cls 
 * @returns { T }
 * @since 26.02.24
 */
export function nullbut(cls) {
    // @ts-ignore
    return null;
}

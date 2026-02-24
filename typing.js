// @ts-check

/**
 * Muda o tipo de um objeto (editor only)
 *
 * @template T
 * @param {new(...args: any[]) => T} Type - construtor da classe
 * @param {any} object
 * @returns {T} 
 */
export function cast(Type, object) {
    return /** @type {T} */(object);
}


/**
 * Cria um objeto (editor only)
 *
 * @template T
 * @param {new(...args: any) => T} Type 
 * @param {T} object 
 * @returns {T} 
 */
export function make(Type, object) {
    return object;
}

/**
 * Cria um "constructor" a partir de um objeto
 *  
 * @template T
 * @param {T} object 
 * @returns {{ new(): T }}
 */
export function toInstance(object) {
    // @ts-ignore
    return class {
        constructor() {
            Object.assign(this, object);
        }
    };
}
// @ts-check

/**
 * Unit for abbreviation
 * @typedef {Object} Unit
 * @property {number} value
 * @property {string} suffix
 */

/**
 * Manage cookies
 * @version 26.02.23
 * @since 26.02.23
 *  */
export const CookieService = {
    setCookie: /**
     * Set a cookie value
     *
     * @param {string} name
     * @param {any} obj
     * @param {number} [days=7]
     */
    function(name, obj, days = 7)
    {
        const value = encodeURIComponent(JSON.stringify(obj));
        const exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${exp.toUTCString()};path=/`;
    },
    getCookie: /**
     * Get a cookie value
     *
     * @template T
     *
     * @param {string} name
     * @param {T} def
     * @return {T}
     */
    function(name, def)
    {
        const cookies = document.cookie.split("; ");
        for (const c of cookies)
        {
            const [key, value] = c.split("=");
            if (key == name)
            {
                return JSON.parse(decodeURIComponent(value));
            }
        }
        return def;
    }
}
export const EMPTY = {};

let _Units = [
    { value: 1e3 , suffix: 'k' },
    { value: 1e6 , suffix: 'm' },
    { value: 1e9 , suffix: 'B' },
    { value: 1e12, suffix: 'T' },
    { value: 1e15, suffix: 'Qd' },
    { value: 1e18, suffix: 'Qt' },
    { value: 1e21, suffix: 'Sx' },
]

/**
 * @version 26.02.23
 * @since 26.02.23
 */
export const UnitService = {
    Unit: {
        new: /**
         * Creates a new unit
         *
         * @param {number} value
         * @param {string} suffix
         *
         * @return {Unit}
         */
        function(value, suffix) { return { value: value, suffix: suffix } },

        KMBT: _Units,
    },
    convert: /**
     * "Gameifies" a number
     *
     * @param {number} value
     * @param {Unit[]} units
     */
    function(value, units = _Units)
    {
        const abs = Math.abs(value);

        let sortedUnits = units.sort((a, b) => b.value - a.value);

        for (const unit of sortedUnits)
        {
            if (abs >= unit.value)
            {
                const result = value / unit.value;
                return ( parseFloat(result.toFixed(2).toString()) + unit.suffix );
            }
        }

        return value.toString();
    }
}

/**
 * @template {string} T
 * @template { { } } U
 * @typedef {Object} LocalStorage
 * @property {T} name
 * @property {U} data
 * 
 * @property {(key: keyof U, value: U[keyof U]) => void} setItem
 * @property {(key: keyof U) => U[keyof U] | undefined} getItem
 * @property {(key: keyof U) => void} removeItem
 * 
 * @property {() => void} save
 * @property {() => void} load
 * 
 * @property {() => U} getAll
 * @property {(values: Partial<U>) => void} setAll
 * @property {() => void} removeAll
 * @property {(key: keyof U) => boolean} hasKey
 * @property {() => number} size
 * @property {() => void} hook
 * @property {(key: keyof U, cb: (value: U[keyof U]) => U[keyof U]?) => void} evaluateKey
 * @property {boolean} hooked
 * 
 * @version 26.02.26
 * @since 26.02.23
 */
export const LocalStorageService = {

    /** @type {Map<string, LocalStorage<string, any>>} */
    localStorages: new Map(),

    /**
     * @template {string} T
     * @template {{}} U
     * @param {T} name
     * @param {U} defaultValue
     * @returns {LocalStorage<T, U>}
     */
    new(name, defaultValue) {

        if (this.localStorages.has(name)) {
            // @ts-ignore
            return this.localStorages.get(name);
        }

        /** @type {LocalStorage<T, U>} */
        const storage = {

            name,
            data: defaultValue,
            hooked: false,

            setItem(key, value) {
                this.data[key] = value;
            },

            getItem(key) {
                return this.data[key];
            },

            removeItem(key) {
                delete this.data[key];
            },

            /**
             * @since 26.02.25
             */
            save() {
                localStorage.setItem(this.name, JSON.stringify(this.data));
            },

            /**
             * @since 26.02.25
             */
            load() {
                const raw = localStorage.getItem(this.name);
                if (!raw) return;

                try {
                    /** @type {U} */
                    const parsed = JSON.parse(raw);
                    Object.assign(this.data, parsed);
                } catch {
                    this.data = defaultValue;
                }
            },

            getAll() {
                return this.data;
            },

            setAll(values) {
                Object.assign(this.data, values);
            },

            removeAll() {
                // @ts-ignore
                this.data = {};
                localStorage.removeItem(this.name);
            },

            hasKey(key) {
                return key in this.data;
            },

            size() {
                return Object.keys(this.data).length;
            },

            /**
             * @since 26.02.26
             */
            hook() {
                if (this.hooked) return
                this.hooked = true;
                window.addEventListener("load", (e) => {
                    this.load();
                })
                window.addEventListener("beforeunload", (e) => {
                    this.save();
                })
            },

            /**
             * @since 26.02.26
             */
            evaluateKey(key, cb) {
                this.data[key] = (cb(this.data[key]) ?? this.data[key])
            },
        };

        this.localStorages.set(name, storage);
        return storage;
    },

    /**
     * Obtém um storage existente
     * @template {string} T
     * @template {{}} U
     * @param {T} name
     * @returns {LocalStorage<T, U> | undefined}
     */
    get(name) {
        // @ts-ignore
        return this.localStorages.get(name);
    },

    /**
     * Remove completamente um storage
     * @param {string} name
     */
    delete(name) {
        const storage = this.localStorages.get(name);
        if (!storage) return;

        storage.removeAll();
        this.localStorages.delete(name);
    }
};

import * as hs from "./submodules/HtmlService.js";

import * as fs from "./submodules/FactoryService.js";

import * as es from "./submodules/EventService.js";

const AllServices = {
    "CookieService": CookieService,
    "LocalStorageService": LocalStorageService,
    "UnitService": UnitService,
    "HtmlService": hs,
    "FactoryService": fs,
    "EventService": es,
}

/**
 * Pega um serviço
 *
 * @template {keyof typeof AllServices} K
 * @param {K} service 
 * @returns {(typeof AllServices)[K]}
 */
export function GetService(service) {
    return AllServices[service]
}
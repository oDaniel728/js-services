
/**
 * Unit for abbreviation
 * @typedef {Object} Unit
 * @property {number} value
 * @property {string} suffix
 */

/**
 * Manage cookies
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
 * @template {Record<string, any>} U
 * @typedef {Object} LocalStorage
 * @property {T} name
 * @property {U} data
 * 
 * @property {<K extends string, V>(key: K, value: V) => void} setItem
 * @property {<K extends keyof U, W>(key: K, defaultValue: W) => W} getItem
 * @property {<K extends keyof U>(key: K) => void} removeItem
 * 
 * @property {() => U} getAll
 * @property {<V extends Record<string, any>>(values: V) => void} setAll
 * @property {() => void} removeAll
 * 
 * @property {<K extends keyof U>(key: K) => boolean} hasKey
 * @property {() => number} size
 * 
 * @property {<K extends keyof U>(cb: (key: K, value: U[K], index: number, storage: U) => void) => void} forEach
 */

export const LocalStorageService = {
    /** @type {LocalStorage<string, Record<string, any>>[]} */
    localStorages: [],

    /**
     * Cria um novo local Storage
     * @template {string} T
     * @template {Record<string, any>} U
     * @param {T} name 
     * @param {U} [defaultValue={}]
     * @returns {LocalStorage<T, U>}
     */
    // @ts-ignore
    new(name, defaultValue={}) {
        /** @type {LocalStorage<T, any>} */
        const storage = {
            name,
            data: defaultValue,

            setItem(key, value) {
                this.data[key] = value;
                localStorage.setItem(`${this.name}:${key}`, JSON.stringify(value));
            },

            getItem(key, defaultValue) {
                if (this.data[key] !== undefined) return this.data[key];
                const value = localStorage.getItem(`${this.name}:${String(key)}`);
                if (value !== null) return JSON.parse(value);
                return defaultValue;
            },

            removeItem(key) {
                delete this.data[key];
                localStorage.removeItem(`${this.name}:${String(key)}`);
            },

            getAll() {
                return { ...this.data };
            },

            setAll(values) {
                Object.assign(this.data, values);
                for (const key in values) {
                    localStorage.setItem(`${this.name}:${key}`, JSON.stringify(values[key]));
                }
            },

            removeAll() {
                for (const key in this.data) {
                    localStorage.removeItem(`${this.name}:${key}`);
                }
                this.data = {};
            },

            hasKey(key) {
                return key in this.data;
            },

            size() {
                return Object.keys(this.data).length;
            },

            forEach(cb) {
                // @ts-ignore
                Object.entries(this.data).forEach(([key, value], i) => cb(key.toString(), value, i, this.data));
            }
        };

        if (!this.localStorages.includes(storage)) {
            this.localStorages.push(storage);
        }

        return storage;
    },

    /**
     * Deleta um local Storage pelo nome
     * @param {string} name
     */
    delete(name) {
        const index = this.localStorages.findIndex(s => s.name === name);
        if (index !== -1) {
            this.localStorages[index].removeAll(); // limpa os itens do localStorage real
            this.localStorages.splice(index, 1);
        }
    },

    /**
     * Obtém um local Storage existente pelo nome
     * @param {string} name 
     * @returns {LocalStorage<string, Record<string, any>> | undefined}
     */
    get(name) {
        return this.localStorages.find(s => s.name === name);
    }
};
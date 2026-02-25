// @ts-check

/**
 * @template {string} S
 * @typedef { S extends `${infer T}#${string}`
 *      ? T
 *      : S extends `${infer T}.${string}`
 *          ? T
 *          : S
 * } ExtractTag
 */

/**
 * @template T
 * @typedef {T | Iterable<T>} OneOrMany
 */

export const Element = {
    /**
     * @template {keyof HTMLElementTagNameMap} K
     * @param {K} tag
     * @param {HTMLElement?} parent
     * @returns {HTMLElementTagNameMap[K]}
     */
    new(tag, parent) {
        const e = document.createElement(tag);
        parent?.appendChild(e);
        return e;
    },

    /**
     * @template {keyof HTMLElementTagNameMap} K
     * @param {K} tag
     * @param {string} id
     * @returns {HTMLElementTagNameMap[K]}
     */
    getById(tag, id) {
        return /** @type {HTMLElementTagNameMap[K]} */ (document.getElementById(id));
    },

    /**
     * @template {keyof HTMLElementTagNameMap} K
     * @param {K} tag
     * @param {string} className
     * @returns {HTMLElementTagNameMap[K][]}
     */
    getByClass(tag, className) {
        // @ts-ignore
        return Array.from(document.getElementsByClassName(className));
    },

    /**
     * @template {string} S
     * @param {S} query
     * @returns {ExtractTag<S> extends keyof HTMLElementTagNameMap
     *     ? HTMLElementTagNameMap[ExtractTag<S>] | null
     *     : HTMLElement | null}
     */
    getByQuery(query) {
        // @ts-ignore
        return document.querySelector(query);
    },

    /**
     * @template {string} S
     * @param {S} query
     * @returns {ExtractTag<S> extends keyof HTMLElementTagNameMap
     *     ? NodeListOf<HTMLElementTagNameMap[ExtractTag<S>]>
     *     : NodeListOf<Element>}
     */
    getAllByQuery(query) {
        // @ts-ignore
        return document.querySelectorAll(query);
    },

    /**
     * @template {string} S
     * @param {S} query
     * @returns {ExtractTag<S> extends keyof HTMLElementTagNameMap
     *     ? HTMLElementTagNameMap[ExtractTag<S>]
     *     : HTMLElement}
     */
    getByQueryForce(query) {
        const el = document.querySelector(query);
        if (!el) throw new Error(`Elemento não encontrado: ${query}`);
        // @ts-ignore
        return el;
    },

    /**
     * @template {HTMLElement} T
     * @param {OneOrMany<T>} element
     * @param {Partial<Record<string, string>>} attrs
     * @returns {void}
     */
    setAttrs(element, attrs) {
        this._each(element, (el) => {
            for (const key in attrs) {
                const value = attrs[key];
                if (value != null) el.setAttribute(key, value);
            }
        });
    },

    /**
     * @template {HTMLElement} T
     * @param {OneOrMany<T>} element
     * @param {Partial<CSSStyleDeclaration>} styles
     * @returns {void}
     */
    setCSS(element, styles) {
        this._each(element, (el) => {
            Object.assign(el.style, styles);
        });
    },

    /**
     * @param {OneOrMany<Element>} element
     * @param {string} value
     */
    setText(element, value) {
        this._each(element, (el) => {
            el.textContent = value;
        });
    },

    /**
     * @param {OneOrMany<Element>} element
     * @param {string} value
     */
    setHtml(element, value) {
        this._each(element, (el) => {
            el.innerHTML = value;
        });
    },

    /**
     * @param {OneOrMany<Element>} element
     * @param {string} id
     */
    setId(element, id) {
        this._each(element, (el) => {
            el.id = id;
        });
    },

    /**
     * @param {OneOrMany<Element>} element
     * @param {string | string[]} className
     */
    setClass(element, className) {
        this._each(element, (el) => {
            el.className =
                typeof className === "string"
                    ? className
                    : className.join(" ");
        });
    },

    /**
     * @template {keyof GlobalEventHandlersEventMap} K
     * @param {HTMLElement} element
     * @param {K} type
     * @param {(ev: GlobalEventHandlersEventMap[K]) => void} listener
     */
    on(element, type, listener) {
        element.addEventListener(type, listener);
    },

    /**
     * @template {string} S
     * @template {keyof GlobalEventHandlersEventMap} K
     * @param {S} query
     * @param {K} type
     * @param {(self:
     *      ExtractTag<S> extends keyof HTMLElementTagNameMap
     *          ? HTMLElementTagNameMap[ExtractTag<S>]
     *          : Element,
     *      ev: GlobalEventHandlersEventMap[K]) => void} listener
     */
    onAll(query, type, listener) {
        /** @type {any} */
        const elements = document.querySelectorAll(query);

        elements.forEach((/** @type {ExtractTag<S> extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[ExtractTag<S>] : Element} */ el) => {
            el.addEventListener(type, (ev) => {
                // @ts-ignore
                listener(el, ev);
            });
        });
    },

    /**
     * @param {OneOrMany<Element>} element
     */
    remove(element) {
        this._each(element, (el) => el.remove());
    },

    /**
     * @param {OneOrMany<Element>} element
     */
    clear(element) {
        this._each(element, (el) => {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        });
    },

    /**
     * @returns {DocumentFragment}
     */
    fragment() {
        return document.createDocumentFragment();
    },

    /**
     * @param {OneOrMany<Element>} element
     * @param {string} className
     * @param {boolean=} force
     */
    toggleClass(element, className, force) {
        this._each(element, (el) => {
            el.classList.toggle(className, force);
        });
    },

    /**
     * @template {string} S
     * @param {S} query
     * @returns {boolean}
     */
    exists(query) {
        return document.querySelector(query) != null;
    },

    /**
     * @template T
     * @param {OneOrMany<T>} target
     * @param {(el: T) => void} fn
     * @private
     */
    _each(target, fn) {
        if (
            target &&
            typeof target !== "string" &&
            typeof target !== "function" &&
            Symbol.iterator in Object(target)
        ) {
            for (const el of /** @type {Iterable<T>} */ (target)) {
                fn(el);
            }
        } else {
            fn(/** @type {T} */ (target));
        }
    },
};
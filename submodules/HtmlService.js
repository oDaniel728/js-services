// @ts-check

/**
 * @since 26.02.24
 */

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

/**
 * @typedef {{
 *     keyframes: Keyframe[] | PropertyIndexedKeyframes,
 *     options?: number | KeyframeAnimationOptions
 * }} WebAnimationObject
 */

/**
 * @typedef {CSSStyleSheet} CSS
 */
/**
 * @typedef { Omit<typeof Console, "new"> } Console
 */
/** @typedef { { log: (a: string) => void, warn: (a: string) => void, error: (a: string) => void } } Logger */

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
    /**
     * Executa animação CSS (por nome) ou Web Animations API.
     *
     * - string → nome da animação já existente no CSS
     * - objeto → usa Web Animations API
     *
     * @param {HTMLElement} element
     * @param {string | WebAnimationObject} animation
     * @returns {Animation | void}
     */
    animate(element, animation) {
        // 🔹 CSS Animation por nome
        if (typeof animation === "string") {
            // remove animação anterior
            element.style.animation = "none";
            // força reflow para reiniciar
            void element.offsetWidth;

            element.style.animation = animation;
            return;
        }

        // 🔹 Web Animations API
        const { keyframes, options } = animation;

        return element.animate(
            keyframes,
            options ?? { duration: 300, easing: "ease", fill: "forwards" }
        );
    }
};

export const Document = {
    /**
     * Define o título do documento.
     *
     * @param {string} title
     * @returns {void}
     */
    setTitle(title) {
        document.title = title;
    },

    /**
     * Define ou substitui o favicon da página.
     *
     * @param {string} icon - URL do ícone (.ico, .png, .svg, etc.)
     * @returns {void}
     */
    setIcon(icon) {
        /** @type {HTMLLinkElement | null} */
        let link = document.querySelector("link[rel~='icon']");

        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
        }

        link.href = icon;
    },

    /**
     * Redireciona para outra URL.
     *
     * @param {string} href
     * @returns {void}
     */
    sendTo(href) {
        window.location.href = href;
    },

    /**
     * Exibe alerta do navegador.
     *
     * @param {string} message
     * @returns {void}
     */
    windowAlert(message) {
        window.alert(message);
    },

    /**
     * Exibe prompt do navegador.
     *
     * @param {string} message
     * @returns {string | null}
     */
    windowPrompt(message) {
        return window.prompt(message);
    },
    /**
     * Exibe diálogo OK / Cancelar.
     *
     * @param {string} message
     * @returns {boolean} true = OK, false = Cancelar
     */
    windowConfirm(message) {
        return window.confirm(message);
    },

    /**
     * Adiciona um <link rel="stylesheet"> no <head>.
     *
     * O arquivo final será:
     *      styles/{filename}.css
     *
     * @param {string} filename
     * @returns {HTMLLinkElement}
     */
    addLinkStyleSheet(filename) {
        const href = `styles/${filename}.css`;

        /** @type {HTMLLinkElement | null} */
        const existing = document.querySelector(
            `link[rel="stylesheet"][href="${href}"]`
        );

        if (existing) return existing;

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;

        document.head.appendChild(link);
        return link;
    },

    /**
     * Remove um <link rel="stylesheet">.
     *
     * Pode receber:
     *  - Nome do arquivo (sem ".css" e sem "styles/")
     *  - O próprio HTMLLinkElement
     *
     * @param {string | HTMLLinkElement} filename
     * @returns {boolean} true se removeu, false se não encontrou
     */
    removeLinkStyleSheet(filename) {
        /** @type {HTMLLinkElement | null} */
        let link = null;

        if (typeof filename === "string") {
            const href = `styles/${filename}.css`;

            link = document.querySelector(
                `link[rel="stylesheet"][href="${href}"]`
            );
        } else {
            link = filename;
        }

        if (link && link.parentNode) {
            link.parentNode.removeChild(link);
            return true;
        }

        return false;
    },

    /**
     * Carrega CSS dinamicamente via <style>.
     *
     * - name é usado como identificador único (data-style)
     * - content pode ser string CSS ou CSSStyleSheet (adoptedStyleSheets)
     *
     * @param {string} name
     * @param {string | CSS} content
     * @returns {HTMLStyleElement | CSSStyleSheet}
     */
    loadCSS(name, content) {
        // remove anterior se existir
        this.unloadCSS(name);

        // 🔹 Caso seja CSSStyleSheet (moderno)
        if (content instanceof CSSStyleSheet) {
            /** @type {CSSStyleSheet[]} */
            const sheets = /** @type {any} */ (document.adoptedStyleSheets);

            document.adoptedStyleSheets = [...sheets, content];
            return content;
        }

        // 🔹 Caso seja string CSS
        const style = document.createElement("style");
        style.setAttribute("data-style", name);
        style.textContent = content;

        document.head.appendChild(style);
        return style;
    },

    /**
     * Remove CSS carregado dinamicamente.
     *
     * @param {string} name
     * @returns {boolean}
     */
    unloadCSS(name) {
        const style = document.querySelector(`style[data-style="${name}"]`);
        if (style) {
            style.remove();
            return true;
        }

        /** @type {CSSStyleSheet[]} */
        const sheets = /** @type {any} */ (document.adoptedStyleSheets);

        const filtered = sheets.filter((sheet) => {
            // @ts-ignore
            return sheet.__name !== name;
        });

        if (filtered.length !== sheets.length) {
            document.adoptedStyleSheets = filtered;
            return true;
        }

        return false;
    },
    
    /**
     * @template {keyof HTMLElementTagNameMap | HTMLElement} T
     * @param {string} code
     * @param {T} as
     * @param {HTMLElement} where
     * @returns {T extends keyof HTMLElementTagNameMap
     *     ? HTMLElementTagNameMap[T]
     *     : T}
     * @since 26.02.25
     */
    loadHTML(code, as, where) {
        /** @type {HTMLElement} */
        let element;

        if (typeof as === "string") {
            element = document.createElement(as);
        } else {
            element = as;
        }

        element.innerHTML = code;
        where.appendChild(element);

        // @ts-ignore
        return element;
    }
};

/**
 * @since 26.02.25
 */
export const Console = {

    /**
     * Cria um console
     *
     * @param {HTMLElement | string | "console"} output - saída do Console, pode ser algum elemento HTML, string(query) ou "console" pra ser o console padrão
     * @param {keyof HTMLElementTagNameMap=} tag
     * @returns {Console}
     */
    new(output, tag="p") {

        /** @type { Logger } */
        let prompt;
        const genFromHTML = 
            /** @param { HTMLElement } parent @returns { Logger } */ 
            function(parent) {
                return {
                    log: (a) => {
                        const el = Element.new(tag, parent);
                        el.className = "log";
                        el.innerText = a;
                    },
                    
                    warn: (a) => {
                        const el = Element.new(tag, parent);
                        el.className = "warn";
                        el.innerText = a;
                    },
                    
                    error: (a) => {
                        const el = Element.new(tag, parent);
                        el.className = "error";
                        el.innerText = a;
                    },
                }
            }
        if (typeof output === "string") {
            if (output === "console") {
                prompt = console
            } else {
                prompt = genFromHTML(Element.getByQueryForce(output));
            }
        } else {
            prompt = genFromHTML(output);
        }

        return {
            log: function (message)     { prompt.log(message) },
            warn: function (message) { prompt.warn(message) },
            error: function (message)  { prompt.error(message) }
        }
    },
    /**
     * Escreve uma mensagem no terminal
     *
     * @param {string} message 
     */
    log(message) {
        console.log(message);
    },

    /**
     * Escreve um aviso no terminal
     *
     * @param {string} message 
     */
    warn(message) {
        console.warn(message);
    },

    /**
     * Escreve um erro no terminal
     *
     * @param {string} message 
     */
    error(message) {
        console.error(message);
    }
}

/** 
 * @version 26.02.26
 * @since 26.02.26
 */ 
export const File = {
    /**
     * Lê conteúdo de um arquivo a partir de:
     * - uma URL/caminho acessível via fetch
     * - um objeto File do navegador
     *
     * @param {string | File} source
     * @returns {Promise<string>}
     */
    async read(source) {
        if (typeof source === "string") {
            const response = await fetch(source);

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            return await response.text();
        }
        else {
            return await source.text();
        }
    }
}
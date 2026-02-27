// @ts-check

let __hooked = false;
export function hook() {
    if (__hooked) return;
    __hooked = true;
    
}

/** @type {import("./EventService").tEvent} */ 
export const Event = {
    new(...args) {
        return {
            invoked: false,
            callbacks: new Set(),

            connect(cb) {
                this.callbacks.add(cb);
            },
            once(cb) {
                /** @type {typeof cb} */
                const wrapper = (...arg) => {
                    cb(...arg);
                    this.callbacks.delete(wrapper);
                };
                this.connect(wrapper);
            },
            wait() {
                return new Promise(resolve => {
                    const wrapper = (/** @type {any[]} */ ...args) => {
                        this.callbacks.delete(wrapper);
                        // @ts-ignore
                        resolve(args);
                        this.invoked = false;
                    };

                    this.callbacks.add(wrapper);
                });
            },

            emit(...arg) {
                for (const cb of [...this.callbacks])
                {
                    cb(...arg)
                }
            }
        }
    }    
}
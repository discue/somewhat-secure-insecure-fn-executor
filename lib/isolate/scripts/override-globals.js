(function (global) {
    'use strict'

    /**
     *
     * @param {string} fn the name of a global variable
     */
    function throwErrorIfCalled(fn) {
        global[fn] = function () {
            throw Error(`"${fn}" is not allowed in this context.`)
        }
    }

    throwErrorIfCalled('eval')
    throwErrorIfCalled('Function')
})(global);

(function (global) {
    'use strict'

    /**
     *
     * @param {string} key name of a global object
     */
    function installProxyToPreventExecution(key) {
        const propertyNames = Object.getOwnPropertyNames(global[key])
        global[key] = new Proxy(global[key], {
            get(_obj, prop) {
                if (!propertyNames.includes(prop)) {
                    return undefined
                }
                const actualProp = _obj[prop]
                if (!actualProp) {
                    return undefined
                }
                if (typeof actualProp === 'function') {
                    return function () {
                        throw Error(`"${key}.${prop}" is not allowed in this context.`)
                    }
                }
                return _obj[prop]
            }
        })
    }

    installProxyToPreventExecution('WebAssembly')
})(global)
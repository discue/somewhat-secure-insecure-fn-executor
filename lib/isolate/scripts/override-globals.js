(function (global) {
    'use strict'

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

    function installProxyToPreventExecution(object) {
        const propertyNames = Object.getOwnPropertyNames(global[object])
        global[object] = new Proxy(global[object], {
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
                        throw Error(`"${object}.${prop}" is not allowed in this context.`)
                    }
                }
                return _obj[prop]
            }
        })
    }

    installProxyToPreventExecution('WebAssembly')
})(global)
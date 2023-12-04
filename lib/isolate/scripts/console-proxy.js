/* eslint-disable no-global-assign */
/* eslint-disable no-undef */

'use strict'

var logs = {
    log: [],
    error: [],
    warn: [],
    info: []
}

console = new Proxy(console, {
    get(_obj, prop) {
        return (...params) => {
            params.forEach((param) => {
                if (isObject(param)) {
                    logs[prop].push(param.toString())
                } else {
                    logs[prop].push(param)
                }
            })
        }
    }
})
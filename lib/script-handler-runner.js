/* eslint-disable no-global-assign */
/* eslint-disable no-undef */

'use strict'

{
    const CONSOLE_KEY = 'console'
    const DURATION_MILLIS_KEY = 'durationMillis'
    const ERROR_KEY = 'error'
    const RESULT_KEY = 'result'

    const logs = {
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

    const inputRef = $0
    const args = inputRef.getSync('args').copySync().at(0)
    const start = Date.now()

    try {
        const result = userSuppliedScript({ args })
        if (typeof result === 'function') {
            throw new TypeError('Function result must not be of type "function"')
        } else if (typeof result === 'symbol') {
            throw new TypeError('Function result must not be of type "symbol"')
        }
        inputRef.setSync(RESULT_KEY, result, { reference: true })
    } catch (e) {
        console.error(e.toString())
        inputRef.setSync(ERROR_KEY, {
            cause: e.cause,
            code: e.code,
            message: e.message,
            stack: e.stack.split('\n').map(line => line.trim())
        }, { reference: true })
    } finally {
        const end = Date.now()
        inputRef.setSync(DURATION_MILLIS_KEY, end - start)
        inputRef.setSync(CONSOLE_KEY, logs, { reference: true })
    }

    return inputRef
}
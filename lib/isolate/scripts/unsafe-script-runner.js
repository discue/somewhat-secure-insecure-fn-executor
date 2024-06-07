'use strict'

/**
 * 
 * @param {import('isolated-vm').Reference} inputRef the input reference
 * @returns {import('isolated-vm').Reference}
 */
/* eslint-disable-next-line */
function run(inputRef) {
    arguments

    const LOGS_KEY = 'console'
    const DURATION_MILLIS_KEY = 'durationMillis'
    const ERROR_KEY = 'error'
    const RESULT_KEY = 'result'

    const args = inputRef.getSync('args').copySync().at(0)
    const start = Date.now()

    try {
        const result = global.userSuppliedScript({ args })
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
        const logMessages = logs.reduce((context, next) => {
            context[next] = console[next]._cache
            return context
        }, {})
        const end = Date.now()
        inputRef.setSync(DURATION_MILLIS_KEY, end - start)
        inputRef.setSync(LOGS_KEY, logMessages, { reference: true })
    }

    return inputRef
}
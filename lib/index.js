'use strict'

const { createTransferableReference, copyValueFromReference, runWithIsolatedContext } = require('./isolate/isolate.js')

/**
 * @typedef ExecutionResult
 * @property {any} [result] the return value of the given script
 * @property {ExecutionLogs} logs the logs captured during script execution
 * @property {number} durationMillis duration of the script execution in milliseconds
 * @property {ExecutionError} [error] error details captured during script execution
 */

/**
 * @typedef ExecutionLogs
 * @property {Array.<string>} error logs passed to console.error
 * @property {Array.<string>} info logs passed to console.info
 * @property {Array.<string>} log logs passed to console.log
 * @property {Array.<string>} warn logs passed to console.warn
 */

/**
 * @typedef ExecutionError
 * @property {string} [cause] the cause from the caputured error. May be null.
 * @property {number} [code] the code from the captured error. May be null.
 * @property {Array.<string>} stack the stack trace from the captured error.
 * @property {string} message the message from the captured error. 
 */

/**
 * @param {string} script the script to run
 * @param {object} [args] arguments to be passed to the script at runtime
 * @returns {ExecutionResult}
 */
async function run(script, ...args) {
    /* eslint-disable-next-line no-empty-pattern */
    return await runWithIsolatedContext({}, async ({ }, { run, collectAndReleaseRefs, installRunnableScript }) => {
        let logs, error, result, durationMillis

        try {
            await installRunnableScript(script)
            const ref = collectAndReleaseRefs(createTransferableReference({ args }))
            const resultRef = await run(ref)
            const executionResult = collectAndReleaseRefs(resultRef)

            logs = await copyValueFromReference(executionResult, 'console')
            result = await copyValueFromReference(executionResult, 'result')
            error = await copyValueFromReference(executionResult, 'error')
            durationMillis = await copyValueFromReference(executionResult, 'durationMillis')
        } catch (e) {
            error = {
                cause: e.cause,
                code: e.code,
                message: e.message,
                stack: e.stack.split('\n').map(line => line.trim())
            }
        }

        return { result, logs, error, durationMillis }
    })
}

/**
 * 
 * @param {string} script the script to run
 * @param {object} [args] arguments to be passed to the script at runtime
 * @returns {ExecutionResult}
 */
module.exports = async (script, args = {}) => {
    return run(script, args)
}


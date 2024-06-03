'use strict'

const { readFileSync } = require('fs')
const fn = readFileSync(require.resolve('./script-handler-runner.js'), 'utf-8')
const { createTransferableReference, copyValueFromReference, callFunctionWithArguments, runWithIsolatedContext } = require('./isolate/isolate.js')
const { compileAndRunScript } = require('./isolate/script-runner.js')
const { wrapScript } = require('./isolate/wrap-user-provided-adapter-fn-script.js')

/**
 * @typedef ExecutionError
 * @property {string} [cause] the cause from the caputured error. May be null.
 * @property {number} [code] the code from the captured error. May be null.
 * @property {Array.<string>} stack the stack trace from the captured error.
 * @property {string} message the message from the captured error. 
 */

/**
 * @typedef ExecutionResult
 * @property {any} [result] the return value of the given script
 * @property {Object<String, Array>} logs the logs captured during script execution
 * @property {number} durationMillis duration of the script execution in milliseconds
 * @property {ExecutionError} [error] error details captured during script execution
 */

/**
 * @param {string} script
 * @param {object} args
 * @returns {ExecutionResult}
 */
async function run(script, ...args) {
    return await runWithIsolatedContext({}, async ({ isolate, context }, collectAndReleaseRefs) => {
        let logs, error, result, durationMillis

        try {
            await compileAndRunScript({ isolate, context, script })
            const ref = collectAndReleaseRefs(createTransferableReference({ args }))
            const fnResult = collectAndReleaseRefs(await callFunctionWithArguments(context, fn, ref))

            logs = await copyValueFromReference(fnResult, 'console')
            result = await copyValueFromReference(fnResult, 'result')
            error = await copyValueFromReference(fnResult, 'error')
            durationMillis = await copyValueFromReference(fnResult, 'durationMillis')
        } catch (e) {
            error = {}
            error.cause = e.cause
            error.code = e.code
            error.message = e.message
            error.stack = e.stack.split('\n').map(line => line.trim())
        }

        return { result, logs, error, durationMillis }
    })
}

/**
 * 
 * @param {string} script 
 * @param {object} [args]
 */
module.exports = async (script, args = {}) => {
    const wrappedScript = wrapScript(script)
    return run(wrappedScript, args)
}
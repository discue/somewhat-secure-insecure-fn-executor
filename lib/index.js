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
 * @property {string} stack the stack trace from the captured error.
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
        await compileAndRunScript({ isolate, context, script })
        const ref = collectAndReleaseRefs(createTransferableReference({ args }))
        const fnResult = collectAndReleaseRefs(await callFunctionWithArguments(context, fn, ref))

        const logs = await copyValueFromReference(fnResult, 'console')
        const result = await copyValueFromReference(fnResult, 'result')
        const error = await copyValueFromReference(fnResult, 'error')
        const durationMillis = await copyValueFromReference(fnResult, 'durationMillis')

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
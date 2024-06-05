'use strict'

const { readFileSync } = require('fs')
const fn = readFileSync(require.resolve('./script-handler-runner.js'), 'utf-8')
const { createTransferableReference, copyValueFromReference, callFunctionWithArguments, runWithIsolatedContext } = require('./isolate/isolate.js')
const { isScriptCompileable, runScript } = require('./isolate/script-runner.js')
const { wrapScript } = require('./isolate/wrap-user-provided-adapter-fn-script.js')

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
    return await runWithIsolatedContext({}, async ({ isolate, context }, collectAndReleaseRefs) => {
        let logs, error, result, durationMillis

        try {
            await runScript({ isolate, context, script })
            const ref = collectAndReleaseRefs(createTransferableReference({ args }))
            const fnResult = collectAndReleaseRefs(await callFunctionWithArguments(context, fn, ref))

            logs = await copyValueFromReference(fnResult, 'console')
            result = await copyValueFromReference(fnResult, 'result')
            error = await copyValueFromReference(fnResult, 'error')
            durationMillis = await copyValueFromReference(fnResult, 'durationMillis')
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
    const wrappedScript = wrapScript(script)
    return run(wrappedScript, args)
}

/**
 * Returns true if the script contains no syntax error. Meaning it will call `compileScript`
 * of this very module and return `false` if the method threw an error and return `true`
 * if the script was compiled successfully.
 * 
 * @param {object} options the parameter options object
 * @param {import('isolated-vm').Isolate} options.isolate the isolate used to run the script
 * @param {string} options.script the script to execute
 * @param {string} options.path the script name which will be used in stack traces
 * @returns {Promise<boolean>}
 */
module.exports.isScriptCompileable = async ({ script }) => {
    const wrappedScript = wrapScript(script)
    return runWithIsolatedContext({}, async ({ isolate }) => {
        return isScriptCompileable({ isolate, wrappedScript })
    })
}
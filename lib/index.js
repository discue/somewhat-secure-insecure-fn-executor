'use strict'

const { readFileSync } = require('fs')
const fn = readFileSync('./lib/script-handler-runner.js', 'utf-8')
const { createTransferableReference, copyValueFromReference, callFunctionWithArguments, runWithIsolatedContext } = require('./isolate/isolate.js')
const { compileAndRunScript } = require('./isolate/script-runner.js')
const { wrapScript } = require('./isolate/wrap-user-provided-adapter-fn-script.js')

/**
 * @typedef ExecutionError
 * @property {string} cause
 * @property {number} code
 * @property {string} stack
 * @property {string} message
 */

/**
 * @typedef ExecutionResult
 * @property {any} result
 * @property {Object<String, Array>} logs
 * @property {number} durationMillis
 * @property {ExecutionError} stack
 */

/**
 * @param {string} script
 * @param {Array} args
 * @returns {ExecutionResult}
 */
async function run(script, args) {
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
 * @param {Array} args
 */
module.exports = async (script, ...args) => {
    const wrappedScript = wrapScript(script)
    return run(wrappedScript, args)
}
'use strict'

const { compileScript } = require('./script-compiler.js')

/**
 * Runs the given script **inside** the sandbox and does **not** wrap it inside the helper function
 * that collects logs, catches errors and measures execution time.
 * 
 * Best used for setting up the execution environment **before** running an unsafe script e.g.
 * to add helper methods to the execution environment.
 * 
 * @param {object} options the parameter options object
 * @param {import('isolated-vm').Isolate} options.isolate the isolate used to run the script
 * @param {string} options.script the script to execute
 * @param {string} options.path the script name which will be used in stack traces
 * @param {import('isolated-vm').Context} options.context the isolated context to be used for execution
 * @returns {Promise<undefined>}
 */
module.exports.runSafeScript = async ({ isolate, script, path = 'user-supplied-script.js', context }) => {
    const compiledScript = await compileScript({ isolate, script, path, wrapScript: false })
    await compiledScript.run(context, { timeout: 50, release: true })
}

/**
 * 
 * @param {object} options the parameter options object
 * @param {import('isolated-vm').Isolate} options.isolate the isolate used to run the script
 * @param {string} options.script the script to execute
 * @param {string} options.path the script name which will be used in stack traces
 * @param {import('isolated-vm').Context} options.context the isolated context to be used for execution
 * @returns {Promise<undefined>}
 */
module.exports.runUnsafeScript = async ({ isolate, script, path = 'user-supplied-script.js', context }) => {
    const compiledScript = await compileScript({ isolate, script, path })
    await compiledScript.run(context, { timeout: 50, release: true })
}
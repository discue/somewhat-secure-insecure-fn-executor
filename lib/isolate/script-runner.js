'use strict'

const { compileScript } = require('./script-compiler.js')

/**
 * Runs the given script without any modification **inside** the isolate. 
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
module.exports.installSafeScript = async ({ isolate, script, path = 'user-supplied-script.js', context }) => {
    const compiledScript = await compileScript({ isolate, script, path, wrapScript: false })
    await compiledScript.run(context, { timeout: 50, release: true })
}

/**
 * Wraps the given script in an executable and installs it in the isolate. The script can then be executed
 * by calling the `run` method of this module.
 * 
 * @param {object} options the parameter options object
 * @param {import('isolated-vm').Isolate} options.isolate the isolate used to run the script
 * @param {string} options.script the script to execute
 * @param {string} options.path the script name which will be used in stack traces
 * @param {import('isolated-vm').Context} options.context the isolated context to be used for execution
 * @returns {Promise<undefined>}
 */
module.exports.installRunnableScript = async ({ isolate, script, path = 'user-supplied-script.js', context }) => {
    const compiledScript = await compileScript({ isolate, script, path })
    await compiledScript.run(context, { timeout: 50, release: true })
}
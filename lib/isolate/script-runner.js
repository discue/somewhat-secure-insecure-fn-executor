'use strict'

const { compileScript } = require('./script-compiler.js')

/**
 * 
 * @param {object} options the parameter options object
 * @param {import('isolated-vm').Isolate} options.isolate the isolate used to run the script
 * @param {string} options.script the script to execute
 * @param {string} options.path the script name which will be used in stack traces
 * @param {import('isolated-vm').Context} options.context the isolated context to be used for execution
 * @returns {Promise<undefined>}
 */
module.exports.runScript = async ({ isolate, script, path = 'user-supplied-script.js', context }) => {
    const compiledScript = await compileScript({ isolate, script, path })
    await compiledScript.run(context, { timeout: 50, release: true })
}
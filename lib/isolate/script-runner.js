'use strict'

/**
 * 
 * @param {Object} options
 * @param {import('isolated-vm').Isolate} options.isolate 
 * @param {string} options.script
 * @param {string} options.path
 * @param {import('isolated-vm').Context} options.context
 * @returns 
 */
module.exports.compileAndRunScript = async ({ isolate, script, path = 'user-supplied-script.js', context }) => {
    const compiledScript = await isolate.compileScript(script, { produceCachedData: false, filename: `file:///${path}`, columnOffset: 0, lineOffset: -5 })
    await compiledScript.run(context, { timeout: 50, release: true })
}
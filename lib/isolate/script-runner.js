'use strict'

const IsolatedVM = require('isolated-vm')

/**
 * 
 * @param {Object} options
 * @param {import('isolated-vm').Isolate} options.isolate 
 * @param {string} options.script
 * @param {string} options.path
 * @param {import('isolated-vm').Context} options.context
 * @returns {Promise<undefined>}
 */
module.exports.compileAndRunScript = async ({ isolate, script, path = 'user-supplied-script.js', context }) => {
    const compiledScript = await module.exports.compileScript({ isolate, script, path })
    await compiledScript.run(context, { timeout: 50, release: true })
}

/**
 * 
 * @param {Object} options
 * @param {import('isolated-vm').Isolate} options.isolate 
 * @param {string} options.script
 * @param {string} options.path
 * @returns {Promise<IsolatedVM.Script>}
 */
module.exports.compileScript = async ({ isolate, script, path = 'user-supplied-script.js' }) => {
    return isolate.compileScript(script, { produceCachedData: false, filename: `file:///${path}`, columnOffset: 0, lineOffset: -5 })
}

/**
 * Returns true if the script contains no syntax error. Meaning it will call `compileScript`
 * of this very module and return `false` if the method threw an error and return `true`
 * if the script was compiled successfully.
 * 
 * This method does not return the compiled script. If you need to access the compiled script later
 * it's better to use `compileScript` directly and handle compilation errors directly, too.
 * 
 * @param {Object} options
 * @param {import('isolated-vm').Isolate} options.isolate 
 * @param {string} options.script
 * @param {string} options.path
 * @returns {Promise<boolean>}
 */
module.exports.isScriptCompileable = async ({ isolate, script, path = 'user-supplied-script.js' }) => {
    try {
        await isolate.compileScript(script, { produceCachedData: false, filename: `file:///${path}`, columnOffset: 0, lineOffset: -5 })
        return true
    } catch (e) {
        return false
    }
}
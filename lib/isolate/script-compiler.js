'use strict'

const IsolatedVM = require('isolated-vm')

/**
 * 
 * @param {object} options the parameter options object
 * @param {import('isolated-vm').Isolate} options.isolate the isolate used to run the script
 * @param {string} options.script the script to execute
 * @param {string} options.path the script name which will be used in stack traces
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
 * @param {object} options the parameter options object
 * @param {import('isolated-vm').Isolate} options.isolate the isolate used to run the script
 * @param {string} options.script the script to execute
 * @param {string} options.path the script name which will be used in stack traces
 * @returns {Promise<boolean>}
 */
module.exports.isScriptCompileable = async ({ isolate, script, path = 'user-supplied-script.js' }) => {
    try {
        await isolate.compileScript(script, { produceCachedData: false, filename: `file:///${path}`, columnOffset: 0, lineOffset: -5 })
        return true
    } catch (_e) {
        return false
    }
}
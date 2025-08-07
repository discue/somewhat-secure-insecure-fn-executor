'use strict'

const { wrapScript } = require('./wrap-user-provided-adapter-fn-script.js')

/**
 * 
 * @param {string} script the script to wrap
 * @returns {string}
 */
function wrap(script) {
    return wrapScript(script)
}

/**
 * 
 * @param {object} options the parameter options object
 * @param {import('isolated-vm').Isolate} options.isolate the isolate used to run the script
 * @param {string} options.script the script to execute
 * @param {string} options.path the script name which will be used in stack traces
 * @param {boolean} [options.wrapScript=true] true if the script should be wrapped inside the execution handler that catches errors, logs and measures execution time
 * @returns {Promise<import('isolated-vm').Script>}
 */
module.exports.compileScript = async ({ isolate, script, path = 'user-supplied-script.js', wrapScript = true }) => {
    let columnOffset = 0
    if (wrapScript) {
        script = wrap(script)
        columnOffset = 5
    }
    return isolate.compileScript(script, { produceCachedData: false, filename: `file:///${path}`, columnOffset })
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
 * @param {boolean} [options.wrapScript=true] true if the script should be wrapped inside the execution handler that catches errors, logs and measures execution time
 * @returns {Promise<boolean>}
 */
module.exports.isScriptCompileable = async ({ isolate, script, path = 'user-supplied-script.js', wrapScript = true }) => {
    try {
        await module.exports.compileScript({ isolate, path, script, wrapScript })
        return true
    } catch (_e) {
        return false
    }
}
'use strict'

/**
 * 
 * @param {string} script 
 * @returns {string}
 */
module.exports.wrapScript = (script, argNames = ['args']) => {
    return `function thisIsYourAdapterFn({ ${argNames.join(', ')} }) {
        ${script}
    }`
}
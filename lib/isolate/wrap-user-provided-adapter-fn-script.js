'use strict'

/**
 * 
 * @param {string} script 
 * @returns {string}
 */
module.exports.wrapScript = (script) => {
    return `function thisIsYourAdapterFn({ args }) {
        ${script}
    }`
}
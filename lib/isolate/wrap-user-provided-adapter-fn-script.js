'use strict'

/**
 * 
 * @param {string} script 
 * @returns {string}
 */
module.exports.wrapScript = (script, argNames = ['args']) => {
    return `
function userSuppliedScript(params) {
'use strict'
        
const {${argNames.join(', ')}} = params
${script}
    }`
}
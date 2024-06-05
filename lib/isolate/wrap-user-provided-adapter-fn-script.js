'use strict'

/**
 * 
 * @param {string} script the user provided script
 * @param {Array.<string>} argNames variables to be destructured to make it seem like they were passed to the function as a parameter
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
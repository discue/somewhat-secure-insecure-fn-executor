'use strict'

/**
 * Returns true if given parameter is an object
 * @param {object} any the object, primitive, etc.. to be checked
 * @returns {boolean}
 */
function isObject(any) {
    return typeof any === 'object'
}

/**
 * Returns true if given parameter is a promise
 * @param {object} any the object, primitive, etc.. to be checked
 * @returns {boolean}
 */
function isPromise(any) {
    return typeof any?.finally === 'function'
}

/**
 * Returns true if given parameter is an array
 * @param {object} any the object, primitive, etc.. to be checked
 * @returns {boolean}
 */
function isArray(any) {
    return Array.isArray(any)
}

if (global.fetch) {
    module.exports.isObject = isObject
    module.exports.isPromise = isPromise
    module.exports.isArray = isArray
}
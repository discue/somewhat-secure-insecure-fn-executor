'use strict'

const { Isolate, Reference } = require('isolated-vm')
const { setupHelperScripts } = require('./helper-scripts.js')

const GLOBAL_CONTEXT_KEY = 'global'

/**
 * @typedef IsolateAndContext
 * @property {import('isolated-vm').Isolate} isolate
 * @property {import('isolated-vm').Context} context
 */

/**
 * @param {number} [memoryLimit=128]
 * @returns {IsolateAndContext}
 */
module.exports.createNewIsolatedContext = async (memoryLimit = 128) => {
    const isolate = new Isolate({ memoryLimit })
    const context = isolate.createContextSync()

    const jail = context.global
    jail.set(GLOBAL_CONTEXT_KEY, jail.derefInto())

    await setupHelperScripts(isolate, context)

    return { isolate, context }
}

/**
 * @callback ContextCallback
 * @param {IsolateAndContext} isolateAndContext
 */

/**
 * @param {object} options
 * @param {number} [options.memoryLimit=128]
 * @param {ContextCallback} callback 
 * @returns {object}
 */
module.exports.runWithIsolatedContext = async ({ memoryLimit }, callback) => {
    const collectedRefs = []
    const { isolate, context } = await module.exports.createNewIsolatedContext(memoryLimit)
    try {
        return await callback.call(null, { isolate, context }, (ref) => {
            collectedRefs.push(ref)
            return ref
        })
    } finally {
        collectedRefs
            .filter(ref => ref)
            .forEach(ref => ref.release())
        isolate.dispose()
        context.release()
    }
}

/**
 * 
 * @param {Object} any 
 * @returns {import('isolated-vm').Reference}
 */
module.exports.createTransferableReference = (any) => {
    return new Reference(any)
}

/**
 * 
 * @param {import('isolated-vm').Reference} reference 
 * @param {String} key 
 * @param {Object} defaultValue 
 */
module.exports.copyValueFromReference = async (reference, key, defaultValue = null) => {
    /**
     * @type {import('isolated-vm').Reference}
     */
    const ref = await reference.get(key)
    if (ref == null) {
        return defaultValue
    }
    if (!ref.copy) {
        return ref
    }
    try {
        const value = await ref.copy()
        return value
    } finally {
        ref.release()
    }
}

/**
 * 
 * @param {import('isolated-vm').Context} context 
 * @param {String} functionString 
 * @param  {Array.<import('isolated-vm').Reference>} arguments 
 * @returns {import('isolated-vm').Reference}
 */
module.exports.callFunctionWithArguments = async (context, functionString, ...args) => {
    try {
        return context.evalClosure(functionString, args, { timeout: 1000 })
    } catch (error) {
        console.log(error)
    }
}
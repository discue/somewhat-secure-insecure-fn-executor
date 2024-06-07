'use strict'

const { Isolate, Reference } = require('isolated-vm')
const { setupHelperScripts, freezeGlobals } = require('./helper-scripts.js')
const { installRunnableScript, installSafeScript } = require('./script-runner.js')

const GLOBAL_CONTEXT_KEY = 'global'

/**
 * @typedef IsolateAndContext
 * @property {import('isolated-vm').Isolate} isolate the isolate used to run the script
 * @property {import('isolated-vm').Context} context the isolated execution environment
 */

/**
 * @param {number} [memoryLimit=128] max memory of the execution environment in MB
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
 * @param {object} options the function parameter object
 * @param {number} [options.memoryLimit=128] max memory of the execution environment in MB
 * @param {ContextCallback} callback the callback that will receive the isolated environment
 * @returns {object}
 */
module.exports.runWithIsolatedContext = async ({ memoryLimit }, callback) => {
    const collectedRefs = []
    const { isolate, context } = await module.exports.createNewIsolatedContext(memoryLimit)
    try {
        return await callback.call(null, { isolate, context }, {
            /**
             * 
             * @param {import('isolated-vm').Reference} ref the reference to store for future cleanup
             * @returns 
             */
            collectAndReleaseRefs: (ref) => {
                collectedRefs.push(ref)
                return ref
            },
            freezeGlobalVariables: async () => {
                await freezeGlobals(isolate, context)
            },
            /**
             * 
             * @param {import('isolated-vm').Reference} arg
             */
            run: async (arg) => {
                await freezeGlobals(isolate, context)
                return module.exports.callFunctionWithArguments(context, 'return run($0)', arg)
            },
            createTransferableReference: module.exports.createTransferableReference,
            copyValueFromReference: module.exports.copyValueFromReference,
            callFunctionWithArguments: module.exports.callFunctionWithArguments,
            /**
             * 
             * @param {string} script the script to run
             */
            installTrustedScript: async (script) => {
                return installSafeScript({ isolate, context, script })
            },
            /**
             * 
             * @param {string} script the script to run
             */
            installRunnableScript: async (script) => {
                return installRunnableScript({ isolate, context, script })
            }
        })
    } finally {
        collectedRefs
            .forEach(ref => ref && ref.release())
        isolate.dispose()
        context.release()
    }
}

/**
 * @param {import('isolated-vm').Isolate} isolate the isolate used to run the script
 * @param {import('isolated-vm').Context} context the isolated execution environment
 */
module.exports.freezeGlobals = (isolate, context) => {
    return freezeGlobals(isolate, context)
}

/**
 * 
 * @param {object} any the object to reference
 * @returns {import('isolated-vm').Reference}
 */
module.exports.createTransferableReference = (any) => {
    return new Reference(any)
}

/**
 * 
 * @param {import('isolated-vm').Reference} reference the reference to a value inside the execution environment
 * @param {string} key the key of the value
 * @param {object} defaultValue a default value
 * @returns {object}
 */
module.exports.copyValueFromReference = async (reference, key, defaultValue = undefined) => {
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
 * @param {import('isolated-vm').Context} context the isolated execution environment
 * @param {string} script the script to execute
 * @param {...any} args arguments to be passed to the script
 * @returns {import('isolated-vm').Reference}
 */
module.exports.callFunctionWithArguments = async (context, script, ...args) => {
    try {
        return context.evalClosure(script, args, { timeout: 1000, lineOffset: 0, columnOffset: 0, filename: 'runtime.js' })
    } catch (error) {
        console.log(error)
    }
}
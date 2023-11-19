'use strict'

const { callFunctionWithArguments } = require('../../../lib/isolate/isolate.js')
const { setupHelperScripts } = require('../../../lib/isolate/helper-scripts.js')
const { Isolate } = require('isolated-vm')
const base64Helper = require('../../../lib/isolate/scripts/base64.js')
const objectHelper = require('../../../lib/isolate/scripts/is-object-helpers.js')

describe('HelperScripts', () => {
    let isolate
    let context
    beforeEach(() => {
        isolate = new Isolate({ memoryLimit: 128 })
        context = isolate.createContextSync()

        const jail = context.global
        jail.set('global', jail.derefInto())
    })
    afterEach(() => {
        isolate.dispose()
    })

    Object.keys(base64Helper).forEach((method) => {
        it(`adds base64Helper function ${method}`, async () => {
            await setupHelperScripts(isolate, context)
            await callFunctionWithArguments(context, method)
        })
    })

    Object.keys(objectHelper).forEach((method) => {
        it(`adds objectHelper function ${method}`, async () => {
            await setupHelperScripts(isolate, context)
            await callFunctionWithArguments(context, method)
        })
    })
})
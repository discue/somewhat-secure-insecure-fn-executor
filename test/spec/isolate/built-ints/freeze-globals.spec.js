'use strict'

const { expect } = require('chai')
const globals = require('./get-globals-list.js')
const { callFunctionWithArguments, createNewIsolatedContext } = require('../../../../lib/isolate/isolate.js')

describe('FreezeGlobals', () => {
    let isolate, context
    beforeEach(async () => {
        ({ context, isolate } = await createNewIsolatedContext())
    })
    afterEach(() => {
        return isolate.dispose()
    })

    globals.forEach((globalVariable) => {
        it(`freezes global variable ${globalVariable}`, async () => {
            const fn = `
                   global["${globalVariable}"].a = 'hello'
                   return global["${globalVariable}"].a
                `
            const result = await callFunctionWithArguments(context, fn)
            expect(result).to.equal(undefined)
        })
    })
})
'use strict'

const { expect } = require('chai')
const globals = require('./isolate/built-ints/get-globals-list.js')
const { createNewIsolatedContext } = require('../../lib/isolate/isolate.js')
const run = require('../../lib/index.js')

describe('FreezeGlobals', () => {
    let isolate

    beforeEach(async () => {
        ({ context, isolate } = await createNewIsolatedContext())
    })
    afterEach(() => {
        return isolate.dispose()
    })

    globals.forEach((globalVariable) => {
        if (globalVariable === 'userSuppliedScript') { return }
        it(`does not freeze global variable ${globalVariable} by default`, async () => {
            const fn = `
            global["${globalVariable}"].a = 'hello'
            return global["${globalVariable}"].a
            `
            const { result } = await run(fn)
            expect(result).to.equal(undefined)
        })
    })
})
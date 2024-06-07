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
        it(`does not allow changing global.${globalVariable}`, async () => {
            const fn = `
            global["${globalVariable}"].a = 'hello'
            return global["${globalVariable}"].a
            `
            const { result } = await run(fn)
            expect(result).to.equal(undefined)
        })
    })

    globals.forEach((globalVariable) => {
        if (globalVariable === 'userSuppliedScript') { return }
        it(`does not allow changing globalThis.${globalVariable}`, async () => {
            const fn = `
            globalThis["${globalVariable}"].a = 'hello'
            return globalThis["${globalVariable}"].a
            `
            const { result } = await run(fn)
            expect(result).to.equal(undefined)
        })
    })
})
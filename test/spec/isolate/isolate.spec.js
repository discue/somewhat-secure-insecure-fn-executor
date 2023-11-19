'use strict'

const { expect } = require('chai')
const { callFunctionWithArguments, createNewIsolatedContext, runWithIsolatedContext, createTransferableReference, copyValueFromReference } = require('../../../lib/isolate/isolate.js')

describe('Isolate', () => {
    describe('.creatednewIsolatedContext', () => {
        it('returns isolate and context', async () => {
            const { context, isolate } = await createNewIsolatedContext()
            expect(isolate).not.to.be.null
            expect(isolate).not.to.be.undefined
            expect(context).not.to.be.null
            expect(context).not.to.be.undefined
            isolate.dispose()
        })
    })
    describe('.runWithIsolatedContext', () => {
        it('calls callback with context and isolated', async () => {
            let callbackCalled = false
            await runWithIsolatedContext({}, ({ isolate, context }) => {
                expect(isolate).not.to.be.null
                expect(isolate).not.to.be.undefined
                expect(context).not.to.be.null
                expect(context).not.to.be.undefined
                callbackCalled = true
            })
            expect(callbackCalled).to.equal(true)
        })
    })
    describe('.createTransferableReference', () => {
        it('creates a new reference', () => {
            const ref = createTransferableReference('abc')
            expect(typeof ref.copySync).to.equal('function')
        })
    })
    describe('.copyValueFromReference', () => {
        it('returns value from a reference', async () => {
            const ref = createTransferableReference({ name: 'Peter' })
            const value = await copyValueFromReference(ref, 'name')
            expect(value).to.equal('Peter')
        })
        it('extracts nested ref', async () => {
            const name = createTransferableReference('Peter')
            const ref = createTransferableReference({ name })
            const value = await copyValueFromReference(ref, 'name')
            expect(value).to.equal('Peter')
        })
        it('returns a default value if key does not exist', async () => {
            const ref = createTransferableReference({ name: 'Peter' })
            const value = await copyValueFromReference(ref, 'age', 22)
            expect(value).to.equal(22)
        })
    })
    describe('callFunctionWithArguments', () => {
        it('calls function with given args', async () => {
            await runWithIsolatedContext({}, async ({ context }) => {
                const string = `return $0 + $1`
                const result = await callFunctionWithArguments(context, string, 1, 2)
                expect(result).to.equal(3)
            })
        })
        it('handles string arguments', async () => {
            await runWithIsolatedContext({}, async ({ context }) => {
                const string = `return $0 + $1`
                const result = await callFunctionWithArguments(context, string, '1', '2')
                expect(result).to.equal('12')
            })
        })
        it('handles refs', async () => {
            await runWithIsolatedContext({}, async ({ context }) => {
                const ref = createTransferableReference({ name: 'Peter' })
                const string = `return $0.copySync()['name']`
                const result = await callFunctionWithArguments(context, string, ref)
                expect(result).to.equal('Peter')
            })
        })
        it('does not handle object arguments', async () => {
            await runWithIsolatedContext({}, async ({ context }) => {
                const string = `return $0.name`
                try {
                    await callFunctionWithArguments(context, string, { name: 'Peter' })
                    throw new Error('Must throw')
                } catch (e) {
                    expect(e.message).to.include('non-transferable')
                }
            })
        })
    })
})
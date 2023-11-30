'use strict'

const run = require('../../lib/index.js')
const { expect } = require('chai')

const allowedPrimitives = ['NaN', 'undefined']
const allowedArrayTypes = ['BigUint64Array', 'BigInt64Array', 'Uint8Array', 'Int8Array', 'Uint16Array', 'Int16Array', 'Uint32Array', 'Int32Array', 'Float32Array', 'Float64Array', 'Uint8ClampedArray']
const allowedTypes = ['BigInt', 'DataView', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Proxy', 'Reflect', 'WeakRef', 'Object', 'Function', 'Array', 'Number', 'Infinity', 'Boolean', 'String', 'Symbol',]
const allowedErrors = ['Error', 'AggregateError', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError']
const allowedVariables = ['console', 'global', 'globalThis']
const allowedObjects = ['FinalizationRegistry', 'Math', 'JSON', 'Atomics', 'WebAssembly', 'Intl', 'SharedArrayBuffer', 'ArrayBuffer', 'Date', 'Promise', 'RegExp']
const allowedFunctions = ['atob', 'btoa', 'encodeURI', 'encodeURIComponent', 'escape', 'unescape', 'eval', 'decodeURI', 'decodeURIComponent', 'isFinite', 'isNaN', 'parseInt', 'parseFloat']
const allowedGlobals = [...allowedPrimitives, ...allowedErrors, ...allowedTypes, ...allowedArrayTypes, ...allowedObjects, ...allowedFunctions, ...allowedVariables]
const vars = Object.getOwnPropertyNames(global).filter(global => !allowedGlobals.includes(global))

describe('FunctionExecutor', () => {

    it('executes a simple script', async () => {
        const { result } = await run('return 1+1')
        expect(result).to.equal(2)
    })

    it('returns no error after succesful execution', async () => {
        const { error } = await run('return 1+1')
        expect(error).to.be.undefined
    })

    it('throws if the return value is a function', async () => {
        const { error } = await run('return Date.now')
        expect(error.message).to.equal('Function result must not be of type "function"')
    })

    it('returns no result after error', async () => {
        const { result } = await run('return Date.now')
        expect(result).to.be.undefined
    })

    it('throws if the response is a function', async () => {
        const { error } = await run('return Symbol("1")')
        expect(error.message).to.equal('Function result must not be of type "symbol"')
    })

    it('returns a string result', async () => {
        const { result } = await run('return "2"')
        expect(result).to.equal("2")
    })

    it('returns a numeric result', async () => {
        const { result } = await run('return 2')
        expect(result).to.equal(2)
    })

    it('returns a boolean result', async () => {
        const { result } = await run('return true')
        expect(result).to.equal(true)
    })

    it('returns an object result', async () => {
        const { result } = await run('return {hello: {world: "yes"}}')
        expect(result).to.deep.equal({ hello: { world: 'yes' } })
    })

    it('returns an undefined result', async () => {
        const { result } = await run('return undefined')
        expect(result).to.be.undefined
    })

    it('returns a null result', async () => {
        const { result } = await run('return null')
        expect(result).to.be.null
    })

    it('provides arguments to the function', async () => {
        const { result } = await run('return args', { a: 1 })
        expect(result).to.deep.equal({ a: 1 })
    })

    it('provides arguments to the function 2', async () => {
        const { result } = await run('return args.a + args.b', { a: 1, b: 3 })
        expect(result).to.deep.equal(4)
    })

    vars.forEach((globalVar) => {
        it(`does not allow accessing ${globalVar}`, async () => {
            const { error } = await run(`return ${globalVar}`)
            expect(error.message).to.equal(`${globalVar} is not defined`)
        })
    })
})
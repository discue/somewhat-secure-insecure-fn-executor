'use strict'

const run = require('../../lib/index.js')
const { expect } = require('chai')

const globals = require('./isolate/built-ints/get-globals-list.js')

const ourOwnGlobalFunctions = ['run']
const allowedPrimitives = ['NaN', 'undefined']
const allowedArrayTypes = ['BigUint64Array', 'BigInt64Array', 'Uint8Array', 'Int8Array', 'Uint16Array', 'Int16Array', 'Uint32Array', 'Int32Array', 'Float32Array', 'Float64Array', 'Uint8ClampedArray']
const allowedTypes = ['BigInt', 'DataView', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Proxy', 'Reflect', 'WeakRef', 'Object', 'Function', 'Array', 'Number', 'Infinity', 'Boolean', 'String', 'Symbol',]
const allowedErrors = ['Error', 'AggregateError', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError']
const allowedVariables = ['console', 'global', 'globalThis']
const allowedObjects = ['FinalizationRegistry', 'Math', 'Iterator', 'JSON', 'Atomics', 'WebAssembly', 'Intl', 'SharedArrayBuffer', 'ArrayBuffer', 'Date', 'Promise', 'RegExp']
const allowedFunctions = ['atob', 'btoa', 'encodeURI', 'encodeURIComponent', 'escape', 'unescape', 'eval', 'decodeURI', 'decodeURIComponent', 'isFinite', 'isNaN', 'parseInt', 'parseFloat']
const allowedGlobals = [...ourOwnGlobalFunctions, ...allowedPrimitives, ...allowedErrors, ...allowedTypes, ...allowedArrayTypes, ...allowedObjects, ...allowedFunctions, ...allowedVariables]
const vars = Object.getOwnPropertyNames(global).filter(global => !allowedGlobals.includes(global))

describe('FunctionExecutor', () => {

    it('executes a simple script', async () => {
        const { result } = await run('return 1+1')
        expect(result).to.equal(2)
    });

    (["error", "info", "log", "warn"]).forEach((key) => {
        it(`captures messages passed to console[${key}]`, async () => {
            const result = await run(`console["${key}"]("hello");console["${key}"]("hi")`)
            console.log({ result })
            expect(result.logs[key]).to.have.length(2)
            expect(result.logs[key]).to.deep.equal(['hello', 'hi'])
        })
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

    it('returns an error if global vars get changed', async () => {
        const { result, error } = await run('String.a="a"; return String.a', { a: 1, b: 3 })
        expect(result).to.be.undefined
        expect(error.message).to.equal("Cannot add property a, object is not extensible")
    })

    it('returns an error if global vars get changed', async () => {
        const { result, error } = await run('global["String"].a="a"; return global["String"].a', { a: 1, b: 3 })
        expect(result).to.be.undefined
        expect(error.message).to.equal("Cannot add property a, object is not extensible")
    })

    it('sets line number correctly in stack trace', async () => {
        const { result, error } = await run('global["String"].a="a"; return global["String"].a', { a: 1, b: 3 })
        expect(result).to.be.undefined
        expect(error.stack).to.include("at userSuppliedScript (file:///user-supplied-script.js:6:19)")
    })

    it('does not provide NodeJS globals like process', async () => {
        const { result, error } = await run(`process.exit(0)`)
        expect(result).to.be.undefined
        expect(error.message).to.equal('process is not defined')
    })

    it('is aware of all v8 globals', async () => {
        const ignoredValues = ['global', 'globalThis', 'Iterator', 'undefined', 'NaN', 'Infinity', 'console']
        let { result } = await run(`
        return Object.getOwnPropertyNames(global)
        `)
        result = result.filter(res => !ignoredValues.includes(res))
        expect(result.sort()).to.deep.equal(globals.sort())
    })

    it('does not allow execution of WebAssembly', async () => {
        const { result, error } = await run(`
        WebAssembly.compile(1+1)
        `)
        expect(result).to.be.undefined
        expect(error.message).to.includes("'compile' is a read-only")
    })

    it('does not allow changing WebAssembly', async () => {
        const { result, error } = await run(`
        WebAssembly.compile = () => void 0
        `)
        expect(result).to.be.undefined
        expect(error.message).to.equal("Cannot assign to read only property 'compile' of object '#<Object>'")
    })

    it('does not allow execution of eval', async () => {
        const { result, error } = await run(`
        eval(1+1)
        `)
        expect(result).to.be.undefined
        expect(error.message).to.equal('"eval" is not allowed in this context.')
    })

    it('does not allow execution of encoded eval', async () => {
        const { result, error } = await run(`
        return [][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(+[![]]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+!+[]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]]](!+[]+!+[]+!+[]+[!+[]+!+[]])+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]])()((!![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+!+[]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]]](!+[]+!+[]+!+[]+[!+[]+!+[]])+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[+!+[]+[!+[]+!+[]+!+[]]]+[+!+[]]+(+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]])+[])[!+[]+!+[]]+[+!+[]]+([+[]]+![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[!+[]+!+[]+[+[]]])
        `)
        expect(result).to.be.undefined
        expect(error.message).to.equal('"eval" is not allowed in this context.')
    })

    it('does not allow execution of Worker', async () => {
        const { result, error } = await run(`
        const f = new Worker("")
        return f()
        `)
        expect(result).to.be.undefined
        expect(error.message).to.equal('Worker is not defined')
    })

    it('does not allow execution of Function', async () => {
        const { result, error } = await run(`
        const f = Function("1+1")
        return f()
        `)
        expect(result).to.be.undefined
        expect(error.message).to.equal('"Function" is not allowed in this context.')
    })

    it('does not allow execution of Function', async () => {
        const { result, error } = await run(`
        const f = new Function("1+1")
        return f()
        `)
        expect(result).to.be.undefined
        expect(error.message).to.equal('"Function" is not allowed in this context.')
    })

    it('returns on compilation error', async () => {
        const { result, error } = await run(`
throw new Error(&apos;now&apos;)
`)
        expect(result).to.be.undefined
        expect(error.message).to.equal("Unexpected token '&' [file:///user-supplied-script.js:7:17]")
    })

    vars.sort().forEach((globalVar) => {
        it(`does not allow accessing ${globalVar}`, async () => {
            const { error } = await run(`return ${globalVar}`)
            expect(error.message).to.equal(`${globalVar} is not defined`)
        })
    })
})
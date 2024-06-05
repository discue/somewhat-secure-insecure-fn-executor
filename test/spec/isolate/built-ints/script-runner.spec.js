
const { expect } = require("chai");
const { createNewIsolatedContext, callFunctionWithArguments, createTransferableReference, copyValueFromReference } = require("../../../../lib/isolate/isolate.js")
const { runSafeScript, runUnsafeScript } = require("../../../../lib/isolate/script-runner.js");

async function executeAndGetResult(context) {
    const inputRef = createTransferableReference({ args: [] })
    const outputRef = await callFunctionWithArguments(context, 'return run($0)', inputRef)
    return copyValueFromReference(outputRef, 'result')
}

describe('ScriptRunner', () => {
    let isolate, context
    beforeEach(async () => {
        ({ isolate, context } = await createNewIsolatedContext())
    })
    describe('.runSafeScript', () => {
        it('throws if script has a syntax error', (done) => {
            const script = 'function name() {'
            runSafeScript({ isolate, script }).catch((e) => {
                expect(e.message.startsWith('Unexpected end of input')).to.be.true
                done()
            })
        })
        it('adds safe scripts to the global environment', async () => {
            const script1 = 'function name() { return 101 }'
            await runSafeScript({ isolate, script: script1, context })
            const script2 = 'return global.name()'
            await runUnsafeScript({ isolate, script: script2, context })
            const result = await executeAndGetResult(context)
            expect(result).to.equal(101)
        })
    })
    describe('.runUnsafeScript', () => {
        it('throws if script has a syntax error', (done) => {
            const script = 'function name() {'
            runUnsafeScript({ isolate, script }).catch((e) => {
                expect(e.message.startsWith('Unexpected end of input')).to.be.true
                done()
            })
        })
        it('makes the given script executable', async () => {
            const script = 'return 1+1'
            await runUnsafeScript({ isolate, script, context })
            const result = await executeAndGetResult(context)
            expect(result).to.equal(2)
        })
        it('overrides previous unsafe scripts', async () => {
            let script = 'return 11'
            await runUnsafeScript({ isolate, script, context })
            script = 'return 1+1'
            await runUnsafeScript({ isolate, script, context })
            const result = await executeAndGetResult(context)
            expect(result).to.equal(2)
        })
    })
})
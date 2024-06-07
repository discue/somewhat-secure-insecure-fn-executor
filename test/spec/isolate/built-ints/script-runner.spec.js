
const { expect } = require("chai");
const { createNewIsolatedContext, callFunctionWithArguments, createTransferableReference, copyValueFromReference } = require("../../../../lib/isolate/isolate.js")
const { installSafeScript, installRunnableScript } = require("../../../../lib/isolate/script-runner.js");

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
    describe('.installSafeScript', () => {
        it('throws if script has a syntax error', (done) => {
            const script = 'function name() {'
            installSafeScript({ isolate, script }).catch((e) => {
                expect(e.message.startsWith('Unexpected end of input')).to.be.true
                done()
            })
        })
        it('adds safe scripts to the global environment', async () => {
            const script1 = 'function name() { return 101 }'
            await installSafeScript({ isolate, script: script1, context })
            const script2 = 'return global.name()'
            await installRunnableScript({ isolate, script: script2, context })
            const result = await executeAndGetResult(context)
            expect(result).to.equal(101)
        })
    })
    describe('.installRunnableScript', () => {
        it('throws if script has a syntax error', (done) => {
            const script = 'function name() {'
            installRunnableScript({ isolate, script }).catch((e) => {
                expect(e.message.startsWith('Unexpected end of input')).to.be.true
                done()
            })
        })
        it('makes the given script executable', async () => {
            const script = 'return 1+1'
            await installRunnableScript({ isolate, script, context })
            const result = await executeAndGetResult(context)
            expect(result).to.equal(2)
        })
        it('overrides previous unsafe scripts', async () => {
            let script = 'return 11'
            await installRunnableScript({ isolate, script, context })
            script = 'return 1+1'
            await installRunnableScript({ isolate, script, context })
            const result = await executeAndGetResult(context)
            expect(result).to.equal(2)
        })
    })
})
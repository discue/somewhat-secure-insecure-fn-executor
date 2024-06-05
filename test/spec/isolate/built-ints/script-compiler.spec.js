
const { expect } = require("chai");
const { createNewIsolatedContext } = require("../../../../lib/isolate/isolate.js")
const { compileScript, isScriptCompileable } = require("../../../../lib/isolate/script-compiler.js");

describe('ScriptCompiler', () => {
    let isolate, context
    beforeEach(async () => {
        ({ isolate, context } = await createNewIsolatedContext())
    })
    describe('.compileScript', () => {
        it('throws if script has a syntax error', (done) => {
            const script = 'function name() {'
            compileScript({ isolate, script }).catch((e) => {
                expect(e.message.startsWith('Unexpected end of input')).to.be.true
                done()
            })
        })
        it('compiles a script', async () => {
            const script = 'function name() {}'
            await compileScript({ isolate, script })
        })
    })
    describe('.isScriptCompileable', () => {
        it('returns false if script has syntax error', async () => {
            const script = 'function name() {'
            const result = await isScriptCompileable({ isolate, script })
            expect(result).to.be.false
        })
        it('returns true if script was compiled', async () => {
            const script = 'function name() {}'
            const result = await isScriptCompileable({ isolate, script })
            expect(result).to.be.true
        })
    })
})

const { expect } = require("chai");
const { createNewIsolatedContext } = require("../../../../lib/isolate/isolate.js")
const { runSafeScript } = require("../../../../lib/isolate/script-runner.js");

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
        it('compiles a script', async () => {
            const script = 'function name() {}'
            await runSafeScript({ isolate, script, context })
        })
    })
})
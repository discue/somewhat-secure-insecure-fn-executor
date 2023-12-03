'use strict'

const { expect } = require('chai')
const { wrapScript } = require('../../../lib/isolate/wrap-user-provided-adapter-fn-script.js')

describe('WrapScript', () => {

    it('wraps given script in function', () => {
        const script = wrapScript('console.log("hello world")')
        expect(script.includes('function userProvidedFunction(params) {')).to.equal(true)
    })
    it('includes given script', () => {
        const script = wrapScript('console.log("hello world")')
        expect(script.includes('console.log("hello world")')).to.equal(true)
    })
})
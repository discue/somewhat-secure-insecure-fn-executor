'use strict'

const { expect } = require('chai')
const { atob: isolatedAtob, btoa: isolatedBtoa } = require('../../../../lib/isolate/scripts/base64.js')

describe('Base64', () => {

    describe('.btoa', () => {
        it('converts strings to btoa-compatible base64', () => {
            const input = 'abcwef..,,(())'
            expect(isolatedBtoa(input)).to.equal(btoa(input))
        })

        it('converts strings to Buffer-compatible base64', () => {
            const input = 'abcwef..,,(())'
            expect(isolatedBtoa(input)).to.equal(Buffer.from(input).toString('base64'))
        })
    })

    describe('.atob', () => {
        it('converts strings to atob-compatible base64', () => {
            const input = 'YWJjd2VmLi4sLCgoKSk='
            expect(isolatedAtob(input)).to.equal(atob(input))
        })

        it('converts strings to Buffer-compatible base64', () => {
            const input = 'YWJjd2VmLi4sLCgoKSk='
            expect(isolatedAtob(input)).to.equal(Buffer.from(input, 'base64').toString('utf-8'))
        })
    })
})
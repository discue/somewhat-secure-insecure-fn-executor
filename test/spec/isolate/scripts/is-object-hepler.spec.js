'use strict'

const { expect } = require('chai')
const { isObject, isPromise, isArray } = require('../../../../lib/isolate/scripts/is-object-helpers.js')

describe('ObjectHelper', () => {

    describe('.isObject', () => {
        expect(isObject({})).to.equal(true)
        expect(isObject('')).to.equal(false)
        expect(isObject(1)).to.equal(false)
        expect(isObject()).to.equal(false)
    })

    describe('.isPromise', () => {
        expect(isPromise(Promise.resolve())).to.equal(true)
        expect(isPromise({})).to.equal(false)
        expect(isPromise([])).to.equal(false)
        expect(isPromise('')).to.equal(false)
        expect(isPromise(1)).to.equal(false)
        expect(isPromise()).to.equal(false)
    })

    describe('.isArray', () => {
        expect(isArray({})).to.equal(false)
        expect(isArray([])).to.equal(true)
        expect(isArray('')).to.equal(false)
        expect(isArray(1)).to.equal(false)
        expect(isArray()).to.equal(false)
    })
})
'use strict'

const { obfuscate } = require('javascript-obfuscator')
const category = 'obfuscate'

const { encodeFilesInFolder } = require('./encoder.js')

async function encodeFiles() {
    await encodeFilesInFolder({
        category, callback: async (content) => {
            return obfuscate(content).getObfuscatedCode()
        }
    })
}

encodeFiles()
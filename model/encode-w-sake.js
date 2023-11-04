'use strict'

const sake = require('sake-js')
const category = 'sake'

const { encodeFilesInFolder } = require('./encoder.js')

async function encodeFiles() {
    await encodeFilesInFolder({
        category, callback: async (content) => {
            return sake.obfuscate(content, { random: true })
        }
    })
}

encodeFiles()
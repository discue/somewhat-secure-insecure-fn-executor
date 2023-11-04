'use strict'

const { JSFuck: { encode } } = require('jsfuck')
const category = 'jsfuck'

const { encodeFilesInFolder } = require('./encoder.js')

async function encodeFiles() {
    await encodeFilesInFolder({
        category, callback: async (content) => {
            return encode(content)
        }
    })
}

encodeFiles()
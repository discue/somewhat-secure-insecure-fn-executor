'use strict'

const je = require('jencrypt')
const category = 'jjencode'

const { encodeFilesInFolder } = require('./encoder.js')

async function encodeFiles() {
    await encodeFilesInFolder({
        category, callback: async (content) => {
            return je.encode(content)
        }
    })
}

encodeFiles()
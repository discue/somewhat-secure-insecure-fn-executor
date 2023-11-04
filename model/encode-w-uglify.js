'use strict'

const { minify } = require('uglify-js')
const category = 'uglify'

const { encodeFilesInFolder } = require('./encoder.js')

async function encodeFiles() {
    await encodeFilesInFolder({
        category, callback: async (content) => {
            return minify(content, { compress: true }).code
        }
    })
}

encodeFiles()
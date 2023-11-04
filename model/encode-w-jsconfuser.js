'use strict'

const jsconfuser = require('js-confuser')
const category = 'jsconfuser'

const { encodeFilesInFolder } = require('./encoder.js')

async function encodeFiles() {
    await encodeFilesInFolder({
        category, callback: (content) => {
            return jsconfuser.obfuscate(content, { target: 'node', deadCode: true, minify: false, preset: 'high' })
        }
    })
}

encodeFiles()
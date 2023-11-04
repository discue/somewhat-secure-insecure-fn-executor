'use strict'

const jsconfuser = require('js-confuser')
const category = 'jsconfuser-minified'

const { encodeFilesInFolder } = require('./encoder.js')

async function encodeFiles() {
    await encodeFilesInFolder({
        category, callback: (content) => {
            return jsconfuser.obfuscate(content, { target: 'node', deadCode: true, minify: true })
        }
    })
}

encodeFiles()
'use strict'

const { Classifier } = require('ml-classify-text')
const classifier = new Classifier()

const { readFile, readdir, writeFile, stat } = require('fs/promises')
const path = require('path')
const categories = require('./training-categories.js')

let processedFiles = 0

async function run() {
    await train()
    await saveModel()
    await predict()
}
run()

async function train() {
    for (let category of categories) {
        await readAndTrain(category)
        await saveModel()
    }
}

async function readAndTrain(category) {
    const start = Date.now()
    const contents = await readFilesInFolder(`model/training/${category}`)
    console.log(`Finished reading ${processedFiles} files for category ${category} in ${(Date.now() - start) / 1000}s`)
    classifier.train(contents, category)
    console.log(`Finished processing of ${processedFiles} files for category ${category} in ${(Date.now() - start) / 1000}s`)
    console.log()
    processedFiles = 0
}

async function readFilesInFolder(folderPath) {
    const content = []
    try {
        const files = await readdir(folderPath)

        for (const file of files) {
            const filePath = path.join(folderPath, file)
            const stats = await stat(filePath)

            if (stats.isFile()) {
                processedFiles++
                content.push(await readFile(filePath, 'utf-8'))
            }
        }
    } catch (err) {
        console.error('Error reading directory:', err)
    }
    return content
}

async function predict() {
    const obfuscatedTextResult = classifier.predict("(function(_0x3a4ba2,_0x354d94){var _0x3fdec7=_0x489d,_0x3b6b05=_0x3a4ba2()while(!![]){try{var _0x453ebb=-parseInt(_0x3fdec7(0xc5))/0x1*(parseInt(_0x3fdec7(0xc3))/0x2)+-parseInt(_0x3fdec7(0xca))/0x3+-parseInt(_0x3fdec7(0xc8))/0x4*(parseInt(_0x3fdec7(0xcc))/0x5)+-parseInt(_0x3fdec7(0xc7))/0x6+-parseInt(_0x3fdec7(0xcb))/0x7+-parseInt(_0x3fdec7(0xc6))/0x8+parseInt(_0x3fdec7(0xc4))/0x9if(_0x453ebb===_0x354d94)breakelse _0x3b6b05['push'](_0x3b6b05['shift']())}catch(_0x86cb47){_0x3b6b05['push'](_0x3b6b05['shift']())}}}(_0x1044,0xa362d))function _0x489d(_0x29c6d2,_0x36dbfd){var _0x10440a=_0x1044()return _0x489d=function(_0x489d8d,_0x20c429){_0x489d8d=_0x489d8d-0xc3var _0x3d2aed=_0x10440a[_0x489d8d]return _0x3d2aed},_0x489d(_0x29c6d2,_0x36dbfd)}function hi(){var _0x13e6c2=_0x489dconsole['log'](_0x13e6c2(0xc9))}hi()function _0x1044(){var _0x535eb9=['Hello\x20World!','3003336IqgwFe','6901398yPBFxy','50ZFdHxA','1006eDOGzv','47791125NRRYYR','1722YVoEET','2974336GSnSjC','3730092KnTase','317692GkXcXc']_0x1044=function(){return _0x535eb9}return _0x1044()}")

    if (obfuscatedTextResult.length) {
        obfuscatedTextResult.forEach((prediction) => {
            console.log(`Obfuscated text ${prediction.label} (${prediction.confidence})`)
        })
    } else {
        console.log('No predictions returned')
    }

    const jsTextResult = classifier.predict(`
    import { jQuery } from "../core.js"
    // abdef
    jQuery.readyException = function( error ) {
        // abasef
        window.setTimeout( function() {
            throw error
        } )
    }
    // abcdef
    `)

    if (jsTextResult.length) {
        jsTextResult.forEach((prediction) => {
            console.log(`JS text ${prediction.label} (${prediction.confidence})`)
        })
    } else {
        console.log('No predictions returned')
    }
}

async function saveModel() {
    const model = classifier.model.serialize()
    const content = JSON.stringify(model)
    await writeFile(`./model/export/classify-${Date.now()}.json`, content, 'utf-8')
}
'use strict'

const { readFileSync } = require('fs')
const { resolve } = require('path')

const objectHelpersPath = resolve('./lib/isolate/scripts/is-object-helpers.js')
const isObjectHelpers = readFileSync(objectHelpersPath, 'utf-8')

const base64Path = resolve('./lib/isolate/scripts/base64.js')
const base64 = readFileSync(base64Path, 'utf-8')

const { compileAndRunScript } = require('./script-runner.js')

/**
 * 
 * @param {import('isolated-vm').Isolate} isolate 
 * @returns 
 */
module.exports.setupHelperScripts = async (isolate, context) => {
    await compileAndRunScript({ isolate, context, script: isObjectHelpers, path: objectHelpersPath })
    await compileAndRunScript({ isolate, context, script: base64, path: base64Path })
}
'use strict'

const { readFileSync } = require('fs')

const objectHelpersPath = require.resolve('./scripts/is-object-helpers.js')
const isObjectHelpers = readFileSync(objectHelpersPath, 'utf-8')

const base64Path = require.resolve('./scripts/base64.js')
const base64 = readFileSync(base64Path, 'utf-8')

const freezeGlobalsPath = require.resolve('./built-ins/freeze-globals.js')
const freezeGlobals = readFileSync(freezeGlobalsPath, 'utf-8')

const overrideGlobalsPath = require.resolve('./scripts/override-globals.js')
const overrideGlobals = readFileSync(overrideGlobalsPath, 'utf-8')

const { runScript } = require('./script-runner.js')

/**
 * 
 * @param {import('isolated-vm').Isolate} isolate the isolated environment used to run the script
 * @param {import('isolated-vm').Context} context the isolated context used for execution
 * @returns {Promise.<undefined>}
 */
module.exports.setupHelperScripts = async (isolate, context) => {
    await runScript({ isolate, context, script: isObjectHelpers, path: 'object-helpers.js' })
    await runScript({ isolate, context, script: base64, path: 'base64.js' })
    await runScript({ isolate, context, script: overrideGlobals, path: 'code-generation.js' })
    await runScript({ isolate, context, script: freezeGlobals, path: 'freeze-globals.js' })
}
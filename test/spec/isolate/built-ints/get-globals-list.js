'use strict'

const fs = require('fs')
const { resolve } = require('path')

const dir = '../../../../lib/isolate/built-ins'
const files = fs.readdirSync(resolve(__dirname, dir))
const txtFiles = files.filter(file => file.endsWith('.txt'))

const globalVars = txtFiles.reduce((context, next) => {
    const content = fs.readFileSync(resolve(__dirname, dir, next), 'utf-8')
    const lines = content.split('\n')
    lines.forEach((line) => {
        context.push(line.trim())
    })

    return context
}, [])

module.exports = globalVars
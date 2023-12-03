'use strict'

const fs = require('fs')
const { resolve } = require('path')

const files = fs.readdirSync(resolve(__dirname, '../built-ins'))
const txtFiles = files.filter(file => file.endsWith('.txt'))

const script = txtFiles.reduce((context, next) => {
    context.push('')
    context.push(`//Freezing objects defined in ${next}`)
    const content = fs.readFileSync(next, 'utf-8')
    const lines = content.split('\n')
    lines.forEach((line) => {
        context.push(`Object.freeze(global["${line.trim()}"])`)
    })

    return context
}, ["'use strict'"])

fs.writeFileSync(resolve(__dirname, 'freeze-globals.js'), script.join('\n'), 'utf-8')
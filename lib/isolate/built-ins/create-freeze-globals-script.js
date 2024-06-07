'use strict'

const fs = require('fs')
const { resolve } = require('path')

const dir = resolve(__dirname, '../built-ins')
const files = fs.readdirSync(dir)
const txtFiles = files.filter(file => file.endsWith('.txt'))

const script = txtFiles.reduce((context, next) => {
    context.push('')
    context.push(`//Freezing objects defined in ${next}`)
    const content = fs.readFileSync(resolve(dir, next), 'utf-8')
    const lines = content.split('\n')
    lines.forEach((line) => {
        context.push(`global['${line.trim()}'] = Object.freeze(global['${line.trim()}'])`)
    })

    return context
}, [])

script.push('')
script.push('//Freezing global object now')
script.push('/* eslint-disable-next-line no-global-assign */')
script.push(`global = Object.freeze(global)`)

fs.writeFileSync(resolve(__dirname, 'freeze-globals.js'), script.join('\n'), 'utf-8')
'use strict'

const { readFile, writeFile, stat, readdir } = require('fs/promises')
const path = require('path')

const [, , baseFolder] = process.argv

module.exports.encodeFilesInFolder = async function ({ category, callback }) {
    const input = `${baseFolder}/plain`
    try {
        const files = await readdir(input)

        for (const file of files) {
            const filePath = path.join(input, file)
            const stats = await stat(filePath)

            if (stats.isFile()) {
                const content = await readFile(filePath, 'utf-8')

                try {
                    const encoded = await callback(content)
                    const newPath = filePath.replace('plain', category)

                    await writeFile(newPath, encoded, 'utf-8')
                    console.log('File encoded:', filePath, '->', newPath)
                } catch (e) {

                }

            }
        }
    } catch (err) {
        console.error('Error reading directory:', err)
    }
}
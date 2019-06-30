/**
 * generate file
 */

'use strict'

import * as fs from 'fs-extra'
import * as path from 'path'
import * as colors from 'colors'
import * as inq from 'inquirer'
import { compileFile } from './util/compiler'

function writeFiles(distPath, data, type) {
    if (type !== 'style') {
        type = 'component'
    }

    let tplPath = path.join(__dirname, './tpl', type)

    fs.readdir(tplPath, (err, files) => {
        if (err) {
            console.log(colors.red(err.message))
            return false
        }

        files.forEach(fileName => {
            let content = compileFile(path.join(tplPath, fileName), data)

            let distFileName = fileName.split('.')
            distFileName.pop()
            let newFileName = distFileName.join('.')

            let filePath = path.join(distPath, newFileName)

            console.log(colors.green('write file:'))
            console.log(colors.underline(filePath))
            fs.writeFileSync(filePath, content, 'utf8')
        })

        console.log(colors.green(`${data.componentName} is generated.`))
    })
}

export default async function(distPath, data, type) {
    if (fs.existsSync(distPath)) {
        let answer = await inq.prompt({
            type: 'confirm',
            name: 'isOverride',
            message: `The component ${data.componentPath} is exist. Do you want to override it?`
        })

        if (answer['isOverride']) {
            writeFiles(distPath, data, type)
        }
        return
    }
    fs.mkdirSync(distPath)
    writeFiles(distPath, data, type)
}

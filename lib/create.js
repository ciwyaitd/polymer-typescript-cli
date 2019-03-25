const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const generate = require('./generate')

module.exports = async function create(projectName) {
    const destPath = path.join(path.resolve(), projectName)
    if (fs.existsSync(destPath)) {
        const answer = await inquirer.prompt({
            type: 'confirm',
            name: 'isOverride',
            message: `The directory ${destPath} is exist. Do you want to override it`
        })

        if (!answer['isOverride']) {
            console.log(
                chalk.gray('exiting...')
            )
            process.exit(0)
            return
        }

        console.log(
            chalk.gray(
                'overriding the directory...'
            )
        )
    } else {
        fs.mkdirSync(destPath)
    }
    generate(projectName, destPath)
}

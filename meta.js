const path = require('path')

const {
    sortDependencies,
    installDependencies,
    printMessage
} = require('./lib/utils')

const pkg = require('./package.json')
const templateVersion = pkg.version

module.exports = {
    skipInterpolation: [
        'src/**/*.*',
        'node_modules/**/*.*'
    ],
    helpers: {
        if_or(v1, v2, options) {
            if (v1 || v2) {
                return options.fn(this)
            }

            return options.inverse(this)
        },
        template_version() {
            return templateVersion
        }
    },
    prompts: {
        name: {
            type: 'string',
            required: true,
            label: 'Project name'
        },
        description: {
            type: 'string',
            required: true,
            label: 'Project description',
            default: 'A web component project'
        },
        author: {
            type: 'string',
            label: 'Author'
        },
        version: {
            type: 'string',
            label: 'Version',
            default: '1.0.0'
        }
    },
    complete(data, { chalk }) {
        const green = chalk.green

        sortDependencies(data, green)
        const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

        if (data.autoInstall) {
            installDependencies(cwd, 'yarn', green)
                .then(() =>{
                    printMessage(data, green)
                })
                .catch(e => {
                    console.log(chalk.red('Error'), e)
                })
        } else {
            printMessage(data, chalk)
        }
    }
}

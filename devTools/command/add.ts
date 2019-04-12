import * as os from 'os'
import * as path from 'path'
import * as yargs from 'yargs'
import * as colors from 'colors'
import * as fs from 'fs-extra'
import getGitUser from '../util/getGitUser'
import getDate from '../util/getDate'
import generate from '../generate'

const PS = path.sep

// tslint:disable-next-line
let version = require('../../package.json').version
let gitUser = getGitUser()
let user = os.userInfo({
    encoding: 'utf8'
})

let command: yargs.CommandModule = {
    command: ['add <componentName>', 'a'],
    describe: 'Add a component to project',
    builder: {
        help: {
            alias: 'h'
        }
    },
    handler(args) {
        let type = args.t || 'component'
        if (['component', 'page', 'style'].indexOf(type) === -1) {
            console.log(
                colors.red('just only allow to create page, component or style')
            )
        }

        let dirs = (args.componentName as string).split(PS)
        let componentName = dirs[0]
        if (dirs.length !== 1) {
            componentName = componentName.slice(-1)[0]
        }
        let componentPath = path.join(`${type}s`, args.componentName)
        let ComponentName =
            componentName[0].toLocaleUpperCase() + componentName.substr(1)
        let distFilePath = path.join(
            path.resolve(),
            path.join('src', componentPath)
        )

        let relativePath = ''
        componentPath.split(PS).forEach(v => {
            relativePath = path.join(relativePath, v)
            if (relativePath === componentPath) return
            createNotExistDir(
                path.join(path.resolve(), path.join('src', relativePath))
            )
        })

        generate(
            distFilePath,
            {
                componentPath: componentPath
                    .toLowerCase()
                    .split(PS)
                    .join('-'),
                componentName: componentName
                    .replace(/([A-Z])/g, '-$1')
                    .toLowerCase(),
                ComponentName: ComponentName,
                username: gitUser || user.username,
                version,
                curDate: getDate()
            },
            type
        )
    }
}

function createNotExistDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
}

export default command

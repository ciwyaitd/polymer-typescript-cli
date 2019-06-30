import * as fs from 'fs-extra'

export function compileFile(tplFile: string, data) {
    const conent = fs.readFileSync(tplFile, 'utf8')

    return conent.replace(/\${(\w+)}/gi, function(match, name) {
        return data[name] ? data[name] : match
    })
}

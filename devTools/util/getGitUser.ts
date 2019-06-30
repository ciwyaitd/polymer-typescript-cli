/**
 * get git info
 */

import { execSync as exec } from 'child_process'

export default function () {
    let name = ''
    let email = ''

    try {
        name = exec('git config --get user.name', {
            encoding: 'utf8'
        })
        email = exec('git config --get user.email', {
            encoding: 'utf8'
        })
    } catch (error) {
        console.error(error)
    }

    name = name && JSON.stringify(String(name).trim())
    email = email && ' <' + String(email).trim() +'>'

    return (name || '') + (email || '')
}

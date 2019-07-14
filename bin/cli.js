#!/usr/bin/env node

const program = require('commander')
const create = require('../lib/create')

/**
 * Command
 */
program
    .command('create <project-name>')
    .action(create)

/**
 * Usage
 */
program
    .usage('<project-name>', 'a name or a path')

program.parse(process.argv)

help()
function help() {
    if (program.args.length < 1) {
        return program.help()
    }
}


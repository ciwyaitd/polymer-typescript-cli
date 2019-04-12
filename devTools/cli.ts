#!/usr/bin/env
/**
 * Command line tool
 */

'use strict'

import * as yargs from 'yargs'
import add from './command/add'

// tslint:disable-next-line
let version = require('../package.json').version

yargs
    .command(add)
    .version(version)
    .alias('version', 'v')
    .help().argv

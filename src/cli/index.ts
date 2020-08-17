#!/usr/bin/env node

import yargs from 'yargs'
import * as check from './cmd/check'

yargs.command(check).help().demandCommand().argv

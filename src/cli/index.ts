#!/usr/bin/env node

import yargs from 'yargs'
import * as check from './cmd/check'
import * as outdated from './cmd/outdated'

yargs.command(check).command(outdated).help().demandCommand().argv

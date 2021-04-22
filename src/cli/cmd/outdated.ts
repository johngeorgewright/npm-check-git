import { Argv } from 'yargs'
import { getOutdated } from '../../npm-check-git'
import { HandlerArguments } from '../types'

export const command = 'outdated'

export const desc = 'Check for outdated git packages'

export function builder(yargs: Argv) {
  return yargs
}

export async function handler(_argv: HandlerArguments<typeof builder>) {
  for await (const outdated of getOutdated()) {
    console.error(`${outdated} is out of date`)
  }
}

import { Argv } from 'yargs'
import { HandlerArguments } from '../types'
import npmCheckGit from '../../npm-check-git'

export const command = 'check'

export const desc = 'Checks if a git package is up to date'

export function builder(yargs: Argv) {
  return yargs
    .option('package', {
      alias: 'p',
      demand: true,
      description: 'The name of the package',
      type: 'string',
    })
    .option('ref', {
      alias: 'r',
      default: 'master',
      description: 'The commit reference. IE: master or a sha',
      type: 'string',
    })
}

export async function handler(argv: HandlerArguments<typeof builder>) {
  if (await npmCheckGit(argv.package, argv.ref)) {
    console.info(`✅ ${argv.package} is up to date`)
  } else {
    console.error(`❌ ${argv.package} is out of date`)
    process.exit(1)
  }
}

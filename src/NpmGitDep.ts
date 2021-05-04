import hostedGitInfo from 'hosted-git-info'
import pacote from 'pacote'
import exec from './exec'
import { tryCatch } from '@johngw/error'
import getGitDeps from './getGitDeps'

export default class NpmGitDep {
  private constructor(
    public readonly packageName: string,
    public readonly githubURL: string,
    public readonly committish: string,
    public readonly localSha: string
  ) {}

  async getRemoteSha() {
    const url = await pacote.resolve(`${this.githubURL}#${this.committish}`)
    return hostedGitInfo.fromUrl(url)?.committish
  }

  static async factory(
    packageName: string,
    committish?: string,
    packageRoot: string = process.cwd()
  ) {
    const commitRef =
      committish || (await this.getDefaultCommittish(packageName, packageRoot))

    const { stdout: installedInfo } = await tryCatch(
      () => exec(`npm list ${packageName}`, { cwd: packageRoot }),
      (error) => {
        if (error.code === 128) {
          throw new Error(
            `Ambiguous commit reference for ${packageName}. Unknown revision or path not in the tree.`
          )
        }

        throw error
      }
    )

    const regexp = new RegExp(`${packageName}@\\S+\\s+\\(([^#]+)#(\\w+)`)
    const matches = regexp.exec(installedInfo)

    if (!matches) {
      throw new Error(
        `Cannot parse ${packageName} as a git dependency. Is it definitely installed? If so, maybe it has been installed from the NPM registry.`
      )
    }

    const [, githubURL, localSha] = matches
    return new this(packageName, githubURL, commitRef, localSha)
  }

  static async getDefaultCommittish(
    packageName: string,
    packageRoot: string = process.cwd()
  ) {
    return tryCatch(
      async () => {
        for await (const [name, version] of getGitDeps(packageRoot)) {
          if (name === packageName) {
            return version || 'master'
          }
        }
        return 'master'
      },
      async () => 'master'
    )
  }
}

import hostedGitInfo from 'hosted-git-info'
import pacote from 'pacote'
import exec from './exec'

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
    committish: string = 'master',
    packageRoot: string = process.cwd()
  ) {
    let result: {
      stdout: string
      stderr: string
    }

    try {
      result = await exec(`npm list ${packageName}`, { cwd: packageRoot })
    } catch (error) {
      if (error.code === 128) {
        throw new Error(
          `Ambiguous commit reference ${committish}. Unknown revision or path not in the tree.`
        )
      }

      throw error
    }

    const regexp = new RegExp(`${packageName}@\\S+\\s+\\(([^#]+)#(\\w+)`)
    const matches = regexp.exec(result.stdout)

    if (!matches) {
      throw new Error(
        `Cannot parse ${packageName} as a git dependency. Is it definitely installed? If so, maybe it has been installed from the NPM registry.`
      )
    }

    const [, githubURL, localSha] = matches
    return new this(packageName, githubURL, committish, localSha)
  }
}

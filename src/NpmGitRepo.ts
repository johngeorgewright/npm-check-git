import hostedGitInfo from 'hosted-git-info'
import pacote from 'pacote'
import exec from './exec'

export default class NpmGitRepo {
  readonly committish: string
  readonly githubURL: string
  readonly localSha: string
  readonly packageName: string

  private constructor(
    packageName: string,
    githubURL: string,
    committish: string,
    localSha: string
  ) {
    this.committish = committish
    this.githubURL = githubURL
    this.localSha = localSha
    this.packageName = packageName
  }

  async getRemoteSha() {
    const url = await pacote.resolve(`${this.githubURL}#${this.committish}`)
    return hostedGitInfo.fromUrl(url).committish
  }

  static async factory(packageName: string, committish: string = 'master') {
    const result = await exec(`npm list ${packageName}`)
    const regexp = new RegExp(`${packageName}@\\S+\\s+\\(([^#]+)#(\\w+)`)
    const matches = regexp.exec(result.stdout)

    if (!matches) {
      throw new Error(`Cannot parse ${packageName} as a git dependency`)
    }

    const [, githubURL, localSha] = matches
    return new this(packageName, githubURL, committish, localSha)
  }
}

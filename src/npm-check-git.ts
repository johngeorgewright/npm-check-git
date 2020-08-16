import hostedGitInfo from 'hosted-git-info'
import pacote from 'pacote'
import exec from './exec'

export default async function npmCheckGit(
  packageName: string,
  // Currently not working:
  // https://github.com/npm/pacote/issues/50
  _commitish: string = 'master'
) {
  const result = await exec(`npm list ${packageName}`)
  const regexp = new RegExp(`${packageName}@\\S+\\s+\\(([^#]+)#(\\w+)`)
  const matches = regexp.exec(result.stdout)

  if (!matches) {
    throw new Error(`Cannot parse ${packageName} as a git dependency`)
  }

  const [, githubURL, current] = matches
  // const url = await pacote.resolve(`${githubURL}#${commitish}`)
  const url = await pacote.resolve(githubURL)
  const latest = hostedGitInfo.fromUrl(url).committish

  return current === latest
}

import NpmGitDep from './NpmGitDep'
import getGitDeps from './getGitDeps'

export async function checkDependency(
  packageName: string,
  committish: string = 'master',
  packageRoot = process.cwd()
) {
  const npmGitDep = await NpmGitDep.factory(
    packageName,
    committish,
    packageRoot
  )
  return npmGitDep.localSha === (await npmGitDep.getRemoteSha())
}

export async function* getOutdated(packageRoot = process.cwd()) {
  const packages = await getGitDeps(packageRoot)

  for (const [packageName, committish] of Object.entries(packages)) {
    if (!(await checkDependency(packageName, committish, packageRoot))) {
      yield packageName
    }
  }
}

export async function getLocalSha(
  packageName: string,
  committish: string = 'master',
  packageRoot = process.cwd()
) {
  const npmGitDep = await NpmGitDep.factory(
    packageName,
    committish,
    packageRoot
  )
  return npmGitDep.localSha
}

export async function getRemoteSha(
  packageName: string,
  committish: string = 'master',
  packageRoot = process.cwd()
) {
  const npmGitDep = await NpmGitDep.factory(
    packageName,
    committish,
    packageRoot
  )
  return npmGitDep.getRemoteSha()
}

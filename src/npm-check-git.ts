import NpmGitDep from './NpmGitDep'

export default async function npmCheckGit(
  packageName: string,
  committish: string = 'master'
) {
  const npmGitRepo = await NpmGitDep.factory(packageName, committish)
  return npmGitRepo.localSha === (await npmGitRepo.getRemoteSha())
}

export async function getLocalSha(
  packageName: string,
  committish: string = 'master'
) {
  const npmGitRepo = await NpmGitDep.factory(packageName, committish)
  return npmGitRepo.localSha
}

export async function getRemoteSha(
  packageName: string,
  committish: string = 'master'
) {
  const npmGitRepo = await NpmGitDep.factory(packageName, committish)
  return npmGitRepo.getRemoteSha()
}

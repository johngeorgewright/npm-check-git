import NpmGitRepo from './NpmGitRepo'

export default async function npmCheckGit(
  packageName: string,
  committish: string = 'master'
) {
  const npmGitRepo = await NpmGitRepo.factory(packageName, committish)
  return npmGitRepo.localSha === (await npmGitRepo.getRemoteSha())
}

export async function getLocalSha(packageName: string) {
  const npmGitRepo = await NpmGitRepo.factory(packageName)
  return npmGitRepo.localSha
}

export async function getRemoteSha(packageName: string) {
  const npmGitRepo = await NpmGitRepo.factory(packageName)
  return npmGitRepo.getRemoteSha()
}

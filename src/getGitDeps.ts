import { readFile } from './fs'

const REGEXP_GIT_VERSION = /^git(?:hub|\+ssh|\+http?|\+file)?:[^#]+(?:#(.+))?$/

export default async function getGitDeps(packageRoot: string) {
  const content = await readFile(`${packageRoot}/package.json`, {
    encoding: 'utf-8',
  })
  const json = JSON.parse(content)
  const dependencies = isRecord(json.dependencies)
    ? gitDepsAndRefs(json.dependencies)
    : {}
  const devDependencies = isRecord(json.devDependencies)
    ? gitDepsAndRefs(json.devDependencies)
    : {}
  return { ...dependencies, ...devDependencies }
}

function gitDepsAndRefs(deps: Record<string, string>) {
  return Object.entries(deps).reduce<Record<string, string>>(
    (gitDeps, [name, version]) => {
      const matches = REGEXP_GIT_VERSION.exec(version)
      if (matches) {
        gitDeps[name] = matches[1] || 'master'
      }
      return gitDeps
    },
    {}
  )
}

function isRecord(x: any): x is Record<string, string> {
  return typeof x === 'object' && x !== null
}

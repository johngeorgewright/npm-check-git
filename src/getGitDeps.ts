import { readFile } from 'node:fs/promises'

const REGEXP_GIT_VERSION = /^git(?:hub|\+ssh|\+https?|\+file)?:[^#]+(?:#(.+))?$/

export default async function* getGitDeps(packageRoot: string) {
  const content = await readFile(`${packageRoot}/package.json`, {
    encoding: 'utf-8',
  })

  const json = JSON.parse(content)

  if (isRecord(json.dependencies)) yield* gitDepsAndRefs(json.dependencies)

  if (isRecord(json.devDependencies))
    yield* gitDepsAndRefs(json.devDependencies)
}

function* gitDepsAndRefs(deps: Record<string, string>) {
  for (const [name, version] of Object.entries(deps)) {
    const matches = REGEXP_GIT_VERSION.exec(version)
    if (matches) yield [name, matches[1] || 'master'] as const
  }
}

function isRecord(x: any): x is Record<string, string> {
  return typeof x === 'object' && x !== null
}

import * as pathHelper from 'node:path'
import getGitDeps from '../getGitDeps'

const packageRoot = pathHelper.join(__dirname, 'test2-package')

test('finds all git dependencies in a package.json', async () => {
  const results: Array<readonly [string, string]> = []

  for await (const result of getGitDeps(packageRoot)) {
    results.push(result)
  }

  expect(results).toEqual([
    ['cli0', 'master'],
    ['cli1', 'v1.0.27'],
    ['cli2', 'semver:^5.0'],
    ['cli3', 'master'],
    ['cli4', 'v1.0.27'],
  ])
})

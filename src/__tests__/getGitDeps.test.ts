import * as pathHelper from 'path'
import getGitDeps from '../getGitDeps'

const packageRoot = pathHelper.join(__dirname, 'test2-package')

test('finds all git dependencies in a package.json', async () => {
  expect(await getGitDeps(packageRoot)).toEqual({
    cli0: 'master',
    cli1: 'v1.0.27',
    cli2: 'semver:^5.0',
    cli3: 'master',
    cli4: 'v1.0.27',
  })
})

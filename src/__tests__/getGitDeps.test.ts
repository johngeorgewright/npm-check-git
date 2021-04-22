import * as pathHelper from 'path'
import getGitDeps from '../getGitDeps'

const packageRoot = pathHelper.join(__dirname, 'test-package')

test('finds all git dependencies in a package.json', async () => {
  expect(await getGitDeps(packageRoot)).toEqual({
    'redux-event': 'master',
  })
})

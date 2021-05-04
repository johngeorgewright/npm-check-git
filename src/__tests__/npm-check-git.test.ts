import * as pathHelper from 'path'
import exec from '../exec'
import { checkDependency } from '../npm-check-git'

jest.setTimeout(120_000)

const packageRoot = pathHelper.join(__dirname, 'test-package')

beforeAll(async () => {
  await exec('npm ci', { cwd: packageRoot })
})

afterAll(async () => {
  await exec('npm uninstall libnpm', { cwd: packageRoot })
})

test('check is false when outdated', async () => {
  await exec(
    'npm install --save-dev github:npm/libnpm#d24cd693afa7df9be25967d526cdd695781d1523',
    { cwd: packageRoot }
  )
  expect(await checkDependency('libnpm', 'latest', packageRoot)).toBe(false)
})

test('check is true when up to date', async () => {
  await exec('npm install --save-dev github:npm/libnpm', { cwd: packageRoot })
  expect(await checkDependency('libnpm', 'latest', packageRoot)).toBe(true)
})

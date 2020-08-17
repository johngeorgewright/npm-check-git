import exec from './exec'
import npmCheckGit from './npm-check-git'

jest.setTimeout(120_000)

afterAll(async () => {
  await exec('npm uninstall libnpm')
})

test('check is false when outdated', async () => {
  await exec(
    'npm install --save-dev github:npm/libnpm#d24cd693afa7df9be25967d526cdd695781d1523'
  )
  expect(await npmCheckGit('libnpm', 'latest')).toBe(false)
})

test('check is true when up to date', async () => {
  await exec('npm install --save-dev github:npm/libnpm')
  expect(await npmCheckGit('libnpm', 'latest')).toBe(true)
})

# npm-check-git

Checks if a git dependency is up to date.

[![Node.js Package](https://github.com/johngeorgewright/npm-check-git/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/johngeorgewright/npm-check-git/actions/workflows/npm-publish.yml)

## Usage

As an example, we'll test if npm/libnpm is up to date.

```
npm i npm-check-git github:npm/libnpm#latest
```

To test programatically:

```javascript
import { getOutdated, checkDependency } from 'npm-check-git'
;(async () => {
  /**
   * To check 1 specific package
   */
  await checkDependency(
    //package name
    'libnpm',

    // *Optional* branch or commit ref (defaults to installed version)
    'latest'
  ) // true | false

  /**
   * To check all depdencies in your package.json
   */
  for await (const outdated of getOutdated()) {
    console.info(outdated)
  }
})()
```

Or using the CLI:

```
$> npm-check-git check --package libnpm
✅ libnpm is up to date

$> npm-check-git outdated
libnpm is out of date
```

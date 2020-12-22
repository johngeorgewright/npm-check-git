# npm-check-git

Checks if a git dependency is up to date.

## Usage

As an example, we'll test if npm/libnpm is up to date.

```
npm i npm-check-git github:npm/libnpm#latest
```

To test programatically:

```javascript
const npmCheckGit = require('npm-check-git')

npmCheckGit(
  //package name
  'libnpm',

  // branch or commit ref (defaults to master)
  'latest'
) // true | false
```

Or using the CLI:

```
$> npm-check-git check --package libnpm --ref latest
✅ libnpm is up to date
```

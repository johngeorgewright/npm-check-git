# npm-check-git

Checks if a git dependency is up to date.

```
npm i npm-check-git github:npm/libnpm#latest
```

```javascript
const npmCheckGit = require('npm-check-git')

npmCheckGit(
  //package name
  'libnpm',

  // branch or commit ref (defaults to master)
  'latest'
) // true | false
```

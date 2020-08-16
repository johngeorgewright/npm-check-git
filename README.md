# npm-check-git

Checks if a git dependency is up to date.

```
npm i npm-check-git github:npm/libnpm#master
```

```javascript
const npmCheckGit = require('npm-check-git')

npmCheckGit('libnpm') // true | false
```

Currently limited to `master` tag only. Waiting on https://github.com/npm/pacote/issues/50.

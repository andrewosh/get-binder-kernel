# get-binder-kernel
Get a Binder kernel from the public cluster

Designed for use in applications like [coverpage](https://github.com/nteract/coverpage) that want to request/connect to remote kernels.

### install
```
npm i get-binder-kernel --save
```

### usage
```
const getKernel = require('get-binder-kernel')
getKernel('binder-project/example-requirements', function (err, url) {
  // communicate with the remote kernel at `url` via the Jupyter Notebook API
})
```
### api
#### `getKernel(name, function (err, location) {})`
Spawns and returns a URL for a remote kernel

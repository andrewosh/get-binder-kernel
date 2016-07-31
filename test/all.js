const test = require('tape')
const getKernel = require('..')

test('ensure an example-requirements kernel can be retrieved', function (t) {
  getKernel('binder-project-example-requirements', function (err, location) {
    t.error(err, 'no error getting kernel')
    t.notEqual(location, null, 'location is ' + location)
    t.pass('successfully got a binder kernel')
    t.end()
  })
})

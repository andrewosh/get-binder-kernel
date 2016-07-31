const async = require('async')
const request = require('request')

module.exports = function (name, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  const apiServer = opts.server || 'http://mybinder.org'
  const times = opts.times || 60
  const interval = opts.interval || 1000
  async.waterfall([
    function (next) {
      request({
        url: apiServer + '/api/deploy/' + name,
        json: true
      }, function (err, res, json) {
        if (err) {
          return next(err)
        }
        return next(null, json['id'])
      })
    },
    function (deployId, next) {
      async.retry({ times: times, interval: interval }, function (next) {
        request({
          url: apiServer + '/api/apps/' + name + '/' + deployId,
          json: true
        }, function (err, res, json) {
          if (err) return next(err)
          var location = json['location']
          var status = json['status']
          if (location) {
            if (!(location.startsWith('http://'))) {
              location = 'http://' + location
            }
            return next(null, location)
          } else if (status === 'failed') {
            return next(null)
          }
          return next('try again')
        })
      }, function (err, location) {
        if (err) return next(err)
        return next(null, location)
      })
    }
  ], function (err, location) {
    if (err) return cb(err)
    return cb(null, location)
  })
}


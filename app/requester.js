const fetch = require('node-fetch')

class Requester {
  async getHttpCode (url) {
    const resp = await fetch(url)
    return resp.status
  }
}

module.exports.Requester = Requester

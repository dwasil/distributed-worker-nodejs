const Worker = require('./worker').Worker
const Repository = require('./job/repository').Repository
const Requester = require('./requester').Requester
const mysql = require('mysql')

class Factory {
  static createWorker (params) {
    return new Worker({
      jobRepository: Factory.createRepository(params.user, params.password, params.database, params.host),
      requester: new Requester()
    })
  }

  static createRepository (user, password, database, host) {
    const connection = mysql.createConnection({ user, password, database, host })
    connection.connect((err) => {
      if (err) {
        throw err
      }
    })

    return new Repository({ connection })
  }
}

module.exports.Factory = Factory

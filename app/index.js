const Factory = require('./factory').Factory

const config = require('../config.json')

const worker = Factory.createWorker({
  host: config.MySQL.host,
  user: config.MySQL.user,
  password: config.MySQL.password,
  database: config.MySQL.database
})

worker.start()

// setTimeout(() => { worker.setFinishFlag() }, 60000)

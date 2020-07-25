const DTO = require('./dto').DTO
const Status = require('./status').Status

class Repository {
  constructor (props) {
    this.connection = props.connection
  }

  async startTransaction () {
    return new Promise((resolve, reject) => {
      this.connection.query('START TRANSACTION', function (err, result) {
        if (err) {
          reject(err)
        }

        resolve(result)
      })
    })
  }

  async commitTransaction () {
    return new Promise((resolve, reject) => {
      this.connection.query('COMMIT', function (err, result) {
        if (err) {
          reject(err)
        }

        resolve(result)
      })
    })
  }

  async getNextRow () {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM job WHERE status = ? LIMIT 1 FOR UPDATE', [Status.NEW], function (err, result) {
        if (err) {
          reject(err)
        }

        resolve(result)
      })
    })
  }

  async markRowAsProcessing (id) {
    return new Promise((resolve, reject) => {
      this.connection.query('UPDATE job SET status = ?  WHERE id = ?', [Status.PROCESSING, id], function (err, result) {
        if (err) {
          reject(err)
        }

        resolve(result)
      })
    })
  }

  async getNextJob () {
    await this.startTransaction()
    const res = await this.getNextRow()

    if (!Array.isArray(res) || res.length === 0) {
      await this.commitTransaction()
      return null
    }

    const row = res[0]

    await this.markRowAsProcessing(row.id)
    await this.commitTransaction()
    return new DTO(row)
  }

  updateJob (dto) {
    const sql =
        `UPDATE
             job
         SET status    = ?,
             http_code = ?
         WHERE id = ?`

    return new Promise((resolve, reject) => {
      this.connection.query(sql, [dto.status, dto.httpCode, dto.id], function (err, result) {
        if (err) {
          reject(err)
        }

        resolve(result)
      })
    })
  }
}

module.exports.Repository = Repository

class DTO {
  constructor (prop) {
    this.id = prop.id
    this.url = prop.url
    this.status = prop.status
    this.httpCode = prop.httpCode
  }
}

module.exports.DTO = DTO

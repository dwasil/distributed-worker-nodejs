const chai = require('chai')
const repository = require('../../app/job/repository')
const expect = chai.expect
const assert = chai.assert
const DTO = require('../../app/job/dto').DTO

// eslint-disable-next-line no-undef
describe('Repository', () => {
  it('Should be a function', () => {
    expect(repository.Repository).to.be.a('function')
  })
})

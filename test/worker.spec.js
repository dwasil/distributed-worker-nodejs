const worker = require('../app/worker')
const chai = require('chai')
const assert = chai.assert
const expect = chai.expect

// eslint-disable-next-line no-undef
describe('Worker', () => {
  it('is a function', () => {
    assert.typeOf(worker.Worker, 'function')
    expect(worker.Worker).to.be.a('function')
  })
})

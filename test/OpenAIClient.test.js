const { expect } = require('chai')
const sinon = require('sinon')
const { OpenAIApi } = require('openai')
const OpenAIClient = require('../src/OpenAIClient')
const fs = require('fs')


describe('OpenAIClient', () => {
  let client

  beforeEach(() => {
    client = new OpenAIClient('fake-api-key')
  })

  describe('executeMethod', () => {
    it('should make a request to the OpenAI API', async () => {
      // Set up the stub to return a fake response
      const response = { data: 'fake-response' }
      const stub = sinon.stub(client.openai, 'listModels').resolves(response)

      const result = await client.executeMethod('listModels')
      expect(result).to.equal('fake-response')
      expect(stub.calledWithExactly({})).to.be.true

      stub.restore()
    })

    it('should convert the keys in the options object to snake case', async () => {
      const response = { data: 'fake-response' }
      const stub = sinon.stub(client.openai, 'listModels').resolves(response)

      const result = await client.executeMethod('listModels', { modelName: 'My Model' })
      expect(result).to.equal('fake-response')
      expect(stub.calledWithExactly({ model_name: 'My Model' })).to.be.true

      stub.restore()
    })

    it('should return null if the methodName does not exist', async () => {
      const result = await client.executeMethod('nonExistentMethod')
      expect(result).to.be.undefined
    })
  })
  describe('wrapMethod', () => {
    it('should wrap method', async () => {
      OpenAIApi.prototype.testMethod = () => new Promise((resolve) => resolve(true))
      const stub = sinon.stub(fs, 'createReadStream').resolves(true)
      const options = { 'image': 'zeus.png' }
      const result = await client.wrapMethod('testMethod', 'name<stream>', 'option<fake>')

      await client.executeMethod('testMethod', { name: 'file.png', option: 'foo' })

      stub.restore()
    })
  })
    describe('handleResponse', () => {
    it('should return the data from the response if the data is an object or an array', () => {
      const response = { data: { foo: 'bar' } }
      const result = client.handleResponse(response)

      expect(result).to.equal(JSON.stringify({ foo: 'bar' }, null, 2))
    })

    it('should return the data from the response if the data is not an object or an array', () => {
      const response = { data: 'foo' }
      const result = client.handleResponse(response)
      expect(result).to.equal('foo')
    })
  })

  describe('handleError', () => {
    it('should return the data from the response if the error has a response', () => {
      const error = { response: { data: { foo: 'bar' } } }
      const result = client.handleError(error)
      expect(result).to.deep.equal(JSON.stringify({ foo: 'bar' }, null, 2))
    })

    it('should throw the error if the error does not have a response', () => {
      const error = new Error('foo')
      expect(() => client.handleError(error)).to.throw(Error, 'foo')
    })
  })

})



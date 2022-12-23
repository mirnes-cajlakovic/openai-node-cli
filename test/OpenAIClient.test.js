const { expect } = require('chai');
const sinon = require('sinon');
const { OpenAIApi } = require('openai')
const OpenAIClient = require('../src/OpenAIClient');
const fs = require('fs')


describe('OpenAIClient', () => {
  let client;

  beforeEach(() => {
    client = new OpenAIClient('fake-api-key');
  });

  describe('request', () => {
    it('should make a request to the OpenAI API', async () => {
      // Set up the stub to return a fake response
      const response = { data: 'fake-response' };
      const stub = sinon.stub(client.openai, 'listModels').resolves(response);

      const result = await client.request('listModels');
      expect(result).to.equal('fake-response');
      expect(stub.calledWithExactly({})).to.be.true;

      stub.restore();
    });

    it('should convert the keys in the options object to snake case', async () => {
      // Set up the stub to return a fake response
      const response = { data: 'fake-response' };
      const stub = sinon.stub(client.openai, 'listModels').resolves(response);

      const result = await client.request('listModels', { modelName: 'My Model' });
      expect(result).to.equal('fake-response');
      expect(stub.calledWithExactly({ model_name: 'My Model' })).to.be.true;

      stub.restore();
    });

    it('should return null if the methodName does not exist', async () => {
      const result = await client.request('nonExistentMethod');
      expect(result).to.be.undefined;
    });
    
    it('should wrap method', async () => {
      // Set up the stub to return a fake response
      const value = { testMethod: () => { return new Promise((resolve) => resolve(true)) } };
      const stubOpenai = sinon.createStubInstance(OpenAIApi);
      const stubFs = sinon.stub(fs, 'createReadStream').resolves(true)

      const options = { 'image': 'zeus.png' };
      const result = await client.wrap('testMethod', 'name<stream>', 'option<fake>')

      await client.request('testMethod', { name: 'file.png', option: 'foo' })

      stubFs.restore()

    });
  });
});



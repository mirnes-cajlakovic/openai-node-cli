const { Configuration, OpenAIApi } = require('openai')
const { mapKeys, snakeCase, get } = require('lodash')
const fs = require('fs')

/**
 * A client for making requests to the openai api.
 */
class OpenAIClient {
  /**
   * Creates a new OpenAIClient.
   * @param {string} apiKey - The api key to use for authenticating requests.
   */
  constructor(apiKey) {
    // Wrap api methods to normalize argument format
    this.wrap('cancelFineTune', 'fine_tune_id')
    this.wrap('createFile', 'file<stream>', 'purpose')
    this.wrap('createImageEdit', 'image<stream>', 'mask<stream>')
    this.wrap('createImageVariation', 'image<stream>', 'n', 'size', 'response_format', 'user')
    this.wrap('deleteFile', 'file_id')
    this.wrap('deleteModel', 'model')
    this.wrap('downloadFile', 'file_id')
    this.wrap('retrieveFile', 'file_id')
    this.wrap('retrieveFineTune', 'fine_tune_id')
    this.wrap('retrieveModel', 'model')

    this.configuration = new Configuration({ apiKey })
    this.openai = new OpenAIApi(this.configuration)
  }

  /**
   * Make a request to the openai api.
   * @param {string} methodName - The name of the method to call on the openai api.
   * @param {Object} options - The options for the request.
   * @returns {Promise} A promise that resolves to the data returned by the api.
   */
  async request(methodName, options = {}) {
    // Convert all the keys in the options object to snake case
    const snakeCaseOptions = mapKeys(options, (value, key) => snakeCase(key))

    if (this.openai[methodName]) {
      return await this.openai[methodName](snakeCaseOptions)
        .then((response) => response.data)
        .catch((error) => error?.response?.data || error)
    }
  }
  
  /**
   * Wrap methods from the openai api to normalize method arguments.
   * @param {string} methodName - The name of the method to wrap.
   * @param {...string} keys - The keys used for mapping option values.
   * @returns {void}
   */

  wrap(methodName, ...keys) {
    const methodReference = OpenAIApi.prototype[methodName]
    
    OpenAIApi.prototype[methodName] = async function (options) {
      
      // Convert an array of option keys to an array of option values
      const parameters = keys.map((key) => {
        const regex = /<(.*?)>/
        const match = key.match(regex)
        if (get(match, 1) === 'stream') {
          return fs.createReadStream(options[key.replace(regex, '')])
        }
        return options[key]
      })

      return await methodReference.apply(this, parameters)
    }
  }

}

module.exports = OpenAIClient

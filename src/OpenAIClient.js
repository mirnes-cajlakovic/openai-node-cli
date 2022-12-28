const { Configuration, OpenAIApi } = require('openai')
const { mapKeys, snakeCase, isObject, isArray, get } = require('lodash')
const fs = require('fs')

/**
 * A client for making requests to the openai api.
 */
class OpenAIClient {
  /**
   * Creates a new OpenAIClient.
   * @param {string} apiKey - The api key to use for authenticating requests.
   */
  constructor (apiKey) {
    // Wrap api methods to normalize argument format
    this.wrapMethod('cancelFineTune', 'fine_tune_id')
    this.wrapMethod('createFile', 'file<stream>', 'purpose')
    this.wrapMethod('createImageEdit', 'image<stream>', 'mask<stream>')
    this.wrapMethod('createImageVariation', 'image<stream>', 'n', 'size', 'response_format', 'user')
    this.wrapMethod('deleteFile', 'file_id')
    this.wrapMethod('deleteModel', 'model')
    this.wrapMethod('downloadFile', 'file_id')
    this.wrapMethod('retrieveFile', 'file_id')
    this.wrapMethod('retrieveFineTune', 'fine_tune_id')
    this.wrapMethod('retrieveModel', 'model')

    this.configuration = new Configuration({ apiKey })
    this.openai = new OpenAIApi(this.configuration)
  }

  /**
   * Make a request to the openai api based on provided methodName and options.
   * @param {string} methodName - The name of the method to call on the openai api.
   * @param {Object} options - The options for the request.
   * @returns {Promise} A promise that resolves to the data returned by the api.
   */
  async executeMethod (methodName, options = {}) {
    // Convert all the keys in the options object to snake case
    const snakeCaseOptions = mapKeys(options, (value, key) => snakeCase(key))

    if (this.openai[methodName]) {
      return await this.openai[methodName](snakeCaseOptions)
        .then(this.handleResponse)
        .catch(this.handleError)
    }
  }

  /**
   * Handles the response from an HTTP request.
   *
   * @param {Object} response - The response object.
   * @return {any} The data from the response.
   */
  handleResponse (response) {
    if (isObject(response.data) || isArray(response.data)) {
      return JSON.stringify(response.data, null, 2)
    }

    return response.data
  }

  /**
   * Handles an error from an HTTP request.
   *
   * @param {Error} error - The error object.
   * @throws {Error} The error object.
   */
  handleError (error) {
    if (error.response) {
      return JSON.stringify(error.response.data, null, 2)
    }

    throw error
  }

  /**
   * Wrap methods from the openai api to normalize method arguments.
   * @param {string} methodName - The name of the method to wrap.
   * @param {...string} keys - The keys used for mapping option values.
   * @returns {void}
   */

  wrapMethod (methodName, ...keys) {
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

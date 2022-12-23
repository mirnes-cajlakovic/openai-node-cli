# OpenAI Node

This module provides a client for making requests to the OpenAI API. It allows you to access various capabilities of the OpenAI API, such as creating image variations, canceling fine-tuning processes, and retrieving models.

## Installation

To use this client, you will need to install the required dependencies:

```bash
npm install mirnes-cajlakovic/openai-node
```

## Usage
To use the OpenAIClient, you will need to require the OpenAIClient class and create a new instance of the client by passing in your API key:  

```javascript
const { OpenAIClient } = require('openai-client')

const client = new OpenAIClient(apiKey)
```

To make a request to the OpenAI API, you can use the request method of the client and pass in the name of the method you want to call and an object of options for the request:

```javascript
client.request('createImageVariation', {
  image: '/path/to/image.jpg',
  n: 10,
  size: 256,
  responseFormat: 'url',
  user: 'me'
})
```

The client also provides methods for several common actions, such as retrieving models and canceling fine-tuning processes. These methods are created by wrapping the corresponding methods of the OpenAI API and normalizing their argument formats.

```javascript
client.retrieveModel('image-alpha-001')
client.cancelFineTune('fine-tune-123')
```

Note that these wrapped methods only accept a single object as their argument, with the keys being the names of the parameters that the OpenAI API method expects. The values of the object should be the values of the parameters.

```javascript
client.createImageEdit({
  image: '/path/to/image.jpg',
  mask: '/path/to/mask.png'
})
```

### Available Methods

| Method Name             | Description                                                                              |
|-------------------------|------------------------------------------------------------------------------------------|
| `request(methodName, options)` | Makes a request to the OpenAI API with the specified method name and options.          |
| `cancelFineTune(options)` | Cancels the fine-tuning process with the specified ID.                                   |
| `createFile(options)` | Creates a file for use with the OpenAI API.                                               |
| `createImageEdit(options)` | Creates an edited version of the specified image using the specified mask.               |
| `createImageVariation(options)` | Creates a variation of the specified image.                                            |
| `deleteFile(options)` | Deletes the specified file.                                                               |
| `deleteModel(options)` | Deletes the specified model.                                                              |
| `downloadFile(options)` | Downloads the specified file.                                                            |
| `retrieveFile(options)` | Retrieves information about the specified file.                                           |
| `retrieveFineTune(options)` | Retrieves information about the specified fine-tuning process.                           |
| `retrieveModel(options)` | Retrieves information about the specified model.                                         |



## Example

Here is an example of how you could use the OpenAIClient to create a variation of an image and download the resulting image:

```javascript
const fs = require('fs')
const { OpenAIClient } = require('openai-client')

const apiKey = 'YOUR_API_KEY'
const client = new OpenAIClient(apiKey)

async function createImageVariationAndDownload() {
  // Create the image variation
  const variationResponse = await client.createImageVariation({
    image: '/path/to/image.jpg',
    n: 1,
    size: 512,
    responseFormat: 'url',
    user: 'me'
  })

  // Get the URL of the resulting image
  const imageUrl = variationResponse.data.url

  // Download the image
  const imageData = await client.downloadFile({ fileId: imageUrl })

  // Save the image to a file
  fs.writeFileSync('/path/to/downloaded_image.jpg', imageData)
}

createImageVariationAndDownload()
```


You can find more information about the OpenAI API and the available methods and options in the [API documentation](https://beta.openai.com/docs/api-reference/overview).


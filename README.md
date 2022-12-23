# OpenAI Node API
### Application Programming Interface

This package provides a client for making requests to the OpenAI API. It allows you to access various capabilities of the OpenAI API, such as creating completions, images, embeddings, uploading and downloading files, and managing fine-tune jobs and models.

## Installation

Use Node Package Manager (NPM) to install the package.

```bash
npm install --save -global mirnes-cajlakovic/openai-node
```

## Usage
To use the OpenAIClient, you will need to require the OpenAIClient class and create a new instance of the client by passing in your API key. You can obtain an API key from [beta.openai.com/account/api-keys](https://beta.openai.com/account/api-keys).

```javascript
const { OpenAIClient } = require('openai-client')

const client = new OpenAIClient(apiKey)
```

To make a request to the OpenAI API, you can use the request method of the client and pass in the name of the method you want to call and an object of options for the request:

```javascript
client.request('createCompletion', {
  'model': 'text-davinci-003',
  'prompt': ['Say this is a test'],
  'maxTokens': 7,
  'temperature': 0,
  'topP': 1,
  'n': 1,
  'stream': false,
  'logprobs': null,
  'stop': '\n'
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

# OpenAI Node CLI
### Command Line Interface
The `openai` command is a command line interface (CLI) for interacting with the OpenAI API. It allows you to perform various operations using the OpenAI API, such as creating completions, images, and embeddings, uploading and downloading files, and managing fine-tune jobs and models.


#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `version` | `boolean` | `false` | Output the version number of the openai cli. |
| `help` | `boolean` | `false` | Display help for a specific command or general help if no command is provided. |

## Commands:

cancelFineTune [options]
Immediately cancel a fine-tune job.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fine-tune_id` | `string` | `null` | The ID of the fine-tune job to cancel. |


createCompletion [options]
Creates a completion for the provided prompt and parameters.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `"text-davinci-003"` | ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them. |
| `prompt` | `strings...` | `""` | The prompt(s) to generate completions for, encoded as a string, array of strings, array of tokens, or array of token arrays. |
| `suffix` | `string` | `null` | The suffix that comes after a completion of inserted text. |
| `max-tokens` | `integer` | `16` | The maximum number of tokens to generate in the completion. |
| `temperature` | `float` | `0.7` | What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer. |
| `top-p` | `float` | `1` | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. |
| `n` | `integer` | `1` | How many completions to generate for each prompt. |
| `stream` | `boolean` | `false` | Whether to stream back partial progress. If set, tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message. |
| `presence-penalty` | `float` | `0` | Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics. |
| `frequency-penalty` | `float` | `0` | Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim. |
| `best-of` | `integer` | `1` | Generates best_of completions server-side and returns the 'best' (the one with the highest log probability per token). Results cannot be streamed. |
| `user` | `string` | `null` | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Learn more. |

#### Example:
```bash
openai createCompletion --prompt "The quick brown fox jumps over the lazy" --model "text-davinci-003"
```

### createEdit [options]
Creates a new edit for the provided input, instruction, and parameters.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `"text-davinci-003"` | ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them. |
| `input` | `string` | `` | The input text to edit. |
| `instruction` | `string` | `` | The instruction to guide the edit. |
| `n` | `integer` | `1` | How many edits to generate for the input and instruction. |
| `temperature` | `float` | `0.7` | What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer. |
| `top-p` | `float` | `1` | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  |

#### Example:
```bash
openai createEdit --input "The quick brown fox jumps over the lazy dog." --instruction "Make the sentence more interesting" --model "text-davinci-003"
```

### createEmbedding [options]
Creates an embedding vector representing the input text.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `"text-davinci-003"` | ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them. |
| `input` | `string` | `` | The input text to generate an embedding for. |
| `user` | `string` | `null` | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Learn more. |

#### Example:
```bash
openai createEmbedding --input "The quick brown fox jumps over the lazy dog." --model "text-davinci-003"
```

### createFile [options]
Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `file` | `string` | `` | Name of the JSON Lines file to be uploaded. |
| `purpose` | `string` | `` | The intended purpose of the uploaded documents. |

#### Example:
```bash
openai createFile --file "/path/to/training.jsonl" --purpose "fine-tune"
```

### createFineTune [options]
Creates a job that fine-tunes a specified model from a given dataset.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `training-file` | `string` | `` | The ID of an uploaded file that contains training data. |
| `validation-file` | `string` | `` | The ID of an uploaded file that contains validation data. |
| `n-epochs` | `integer` | `5` | The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset. |
| `batch-size` | `integer` | `null` | The batch size to use for training. The batch size is the number of training examples used to train a single forward and backward pass. |
| `learning-rate-multiplier` | `float` | `null` | The learning rate multiplier to use for training. The fine-tuning learning rate is the original learning rate used for pretraining multiplied by this value. |
| `prompt-loss-weight` | `float` | `0.1` | The weight to use for loss on the prompt tokens. This controls how much the model tries to learn to generate the prompt (as compared to the completion which always has a weight of 1.0), and can add a stabilizing effect to training when completions are short. |
| `compute-classification-metrics` | `boolean` | `false` | If set, we calculate classification-specific metrics such as accuracy and F-1 score using the validation set at the end of every epoch. These metrics can be viewed in the results file. |
| `classification-n-classes` | `integer` | `null` | The number of classes in a classification task. |
| `classification-positive-class` | `string` | `null` |   |
| `classification-betas` | `strings...` | `null` | If this is provided, we calculate F-beta scores at the specified beta values. The F-beta score is a generalization of F-1 score. This is only used for binary classification. |
| `suffix` | `string` | `null` | A string of up to 40 characters that will be added to your fine-tuned model name. |

#### Example:
```bash
openai createFineTune --model "davinci" --training-file "file-i9DZk2twt4deNezMYtPf1LCN"
```

### createImage [options]
Creates an image given a prompt.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `"image-alpha-001"` | ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them. |
| `prompt` | `string` | `` | The prompt to generate an image for. |
| `size` | `string` | `"1024x1024"` | The size of the image to generate. Can be "1024x1024" or "512x512". |

#### Example:
```bash
openai createImage --prompt "A dog playing fetch" --size "512x512"
```

### createImageEdit [options]
Creates an edited or extended image given an original image and a prompt.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `"image-alpha-001"` | ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them. |
| `prompt` | `string` | `` | The prompt to guide the edit of the image. |
| `image` | `string` | `` | The URL or ID of the image to edit. |

#### Example:
```bash
openai createImageEdit --prompt "Add a cat to the image" --image "https://example.com/image.jpg"

```

### createImageVariation [options]
Creates a variation of a given image.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `"image-alpha-001"` | ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them. |
| `image` | `string` | `` | The URL or ID of the image to create a variation of. |
| `prompt` | `string` | `` | The prompt to guide the variation of the image. |

#### Example:

```bash
openai createImageVariation --prompt "Add a cat to the image" --image "https://example.com/image.jpg"
```

### createModeration [options]
Classifies if text violates OpenAI's Content Policy

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `"text-davinci-003"` | ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them. |
| `input` | `string` | `` | The input text to classify. |

#### Example:
```bash
openai createModeration --input "The quick brown fox jumps over the lazy dog."
```

### deleteFile [options]
Delete a file.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `file` | `string` | `` | The ID of the file to delete. |

#### Example:
```bash
openai deleteFile --file "my_file_id"
```

### deleteModel [options]
Delete a fine-tuned model. You must have the Owner role in your organization.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `` | ID of the model to delete. |

#### Example:
```bash
openai deleteModel --model "text-davinci-002"
```

### downloadFile [options]
Returns the contents of the specified file.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `file` | `string` | `` | The ID of the file to download. |

#### Example:
```bash
openai downloadFile --file "my_file_id"
```

### listEngines
Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.

#### Example:
```bash
openai listEngines
```

### listFiles
Returns a list of files that belong to the user's organization.

#### Example:
```bash
openai listFiles
```

### listFineTuneEvents [options]
Get fine-grained status updates for a fine-tune job.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `` | ID of the model to get fine-tune events for. |

#### Example:
```bash
openai listFineTuneEvents --model "text-davinci-002"
```

### listFineTunes
List your organization's fine-tuning jobs.

#### Example:
```bash
openai listFineTunes
```

### listModels
Lists the currently available models, and provides basic information about each one such as the owner and availability.

#### Example:
```bash
openai listModels
```

### retrieveEngine [options]
Retrieves a model instance, providing basic information about it such as the owner and availability.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `` | ID of the model to retrieve. |

#### Example:
```bash
openai retrieveEngine --model "text-davinci-002"
```

### retrieveFile [options]
Returns information about a specific file.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `file` | `string` | `` | The ID of the file to retrieve information for. |

#### Example:
```bash
openai retrieveFile --file "my_file_id"
```

### retrieveFineTune [options]
Gets info about the fine-tune job.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `` | ID of the model to get fine-tune information for. |

#### Example:
```bash
openai retrieveFineTune --model "text-davinci-002"
```

### retrieveModel [options]
Retrieves a model instance, providing basic information about the model such as the owner and permissioning.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `` | ID of the model to retrieve. |

#### Example:
```bash
openai retrieveModel --model "text-davinci-002"
```

### help [command]
Display help for a specific command.

#### Example:
```bash
openai help createCompletion
```



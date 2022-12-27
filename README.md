# OpenAI Node.js CLI
### Command Line Interface
The `openai-node-cli` package is a command line interface (CLI) for interacting with the OpenAI API. It allows you to perform various operations using the OpenAI API, such as creating completions, images, and embeddings, uploading and downloading files, and managing fine-tune jobs and models.

## Overview
* [Installation](#installation)
* [Usage](#usage)
* [Commands](#commands)
  * [cancelFineTune](#cancelFineTune)
  * [createCompletion](#createCompletion)
  * [createEdit](#createEdit)
  * [createEmbedding](#createEmbedding)
  * [createFile](#createFile)
  * [createFineTune](#createFineTune)
  * [createImage](#createImage)
  * [createImageEdit](#createImageEdit)
  * [createImageVariation](#createImageVariation)
  * [createModeration](#createModeration)
  * [deleteFile](#deleteFile)
  * [deleteModel](#deleteModel)
  * [downloadFile](#downloadFile)
  * [listEngines](#listEngines)
  * [listFiles](#listFiles)
  * [listFineTuneEvents](#listFineTuneEvents)
  * [listFineTunes](#listFineTunes)
  * [listModels](#listModels)
  * [retrieveEngine](#retrieveEngine)
  * [retrieveFile](#retrieveFile)
  * [retrieveFineTune](#retrieveFineTune)
  * [retrieveModel](#retrieveModel)


## Installation

Use Node Package Manager (NPM) to install the package globally.

```bash
npm install -g openai-node-cli
```

## Usage

To use the openai api, you will need to create an api key from [beta.openai.com/account/api-keys](https://beta.openai.com/account/api-keys). It is recommended to setup the api key as an enviroment variable.

```bash
export OPENAI_API_KEY="YOUR_API_KEY_HERE"
```

## Commands:

### cancelFineTune
Immediately cancel a fine-tune job.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fine-tune-id` | `string` | `null` | The ID of the fine-tune job to cancel. |


### createCompletion
Creates a completion for the provided prompt and parameters.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `text-davinci-003` | ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them. |
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

### createEdit
Creates a new edit for the provided input, instruction, and parameters.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `text-davinci-003` | ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them. |
| `input` | `string` | `undefined` | The input text to edit. |
| `instruction` | `string` | `undefined` | The instruction to guide the edit. |
| `n` | `integer` | `1` | How many edits to generate for the input and instruction. |
| `temperature` | `float` | `0.7` | What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer. |
| `top-p` | `float` | `1` | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  |

#### Example:
```bash
openai createEdit --input "The quick brown fox jumps over the lazy dog." --instruction "Make the sentence more interesting" --model "text-davinci-003"
```

### createEmbedding
Creates an embedding vector representing the input text.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `text-davinci-003` | ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them. |
| `input` | `string` | `undefined` | The input text to generate an embedding for. |
| `user` | `string` | `null` | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Learn more. |

#### Example:
```bash
openai createEmbedding --input "The quick brown fox jumps over the lazy dog." --model "text-davinci-003"
```

### createFile
Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `file` | `string` | `undefined` | Name of the JSON Lines file to be uploaded. |
| `purpose` | `string` | `undefined` | The intended purpose of the uploaded documents. |

#### Example:
```bash
openai createFile --file "/path/to/training.jsonl" --purpose "fine-tune"
```

### createFineTune
Creates a job that fine-tunes a specified model from a given dataset.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `training-file` | `string` | `undefined` | The ID of an uploaded file that contains training data. |
| `validation-file` | `string` | `undefined` | The ID of an uploaded file that contains validation data. |
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

### createImage
Creates an image given a prompt.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `prompt` | `string` | `undefined` | The prompt to guide the edit of the image. |
| `n` | `integer` | `1` | The number of images to generate. Must be between 1 and 10. |
| `size` | `undefined` | `1024x1024` | The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024. |
| `response-format` | `string` | `url` | The format in which the generated images are returned. Must be one of url or b64_json. |
| `user` | `string` | `undefined` | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Learn more. |

#### Example:
```bash
openai createImage --prompt "A dog playing fetch" --size "512x512"
```

### createImageEdit
Creates an edited or extended image given an original image and a prompt.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `string` | `undefined` | The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask. |
| `mask` | `string` | `undefined` | An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where image should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as image. |
| `prompt` | `string` | `undefined` | The prompt to guide the edit of the image. |
| `n` | `integer` | `1` | The number of images to generate. Must be between 1 and 10. |
| `size` | `undefined` | `1024x1024` | The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024. |
| `response-format` | `string` | `url` | The format in which the generated images are returned. Must be one of url or b64_json. |
| `user` | `string` | `undefined` | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Learn more. |

#### Example:
```bash
openai createImageEdit --prompt "Add a cat to the image" --image "photo.png" --mask "photo-mask.png"

```

### createImageVariation
Creates a variation of a given image.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `string` | `undefined` | The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square. |
| `n` | `integer` | `1` | The number of images to generate. Must be between 1 and 10. |
| `size` | `undefined` | `1024x1024` | The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024. |
| `response-format` | `string` | `url` | The format in which the generated images are returned. Must be one of url or b64_json. |
| `user` | `string` | `undefined` | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Learn more. |

#### Example:

```bash
openai createImageVariation --image "fox.png" --response-format "b64_json"
```

### createModeration
Classifies if text violates OpenAI's Content Policy

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `input` | `string` | `undefined` | The input text to classify. |
| `model` | `string` | `text-moderation-latest` | Two content moderations models are available: text-moderation-stable and text-moderation-latest. |

#### Example:
```bash
openai createModeration --input "The quick brown fox jumps over the lazy dog."
```

### deleteFile
Delete a file.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `file-id` | `string` | `undefined` | The ID of the file to delete. |

#### Example:
```bash
openai deleteFile --file-id "file-i9DZk2twt4deNezMYtPf1LCN"
```

### deleteModel
Delete a fine-tuned model. You must have the Owner role in your organization.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `undefined` | ID of the model to delete. |

#### Example:
```bash
openai deleteModel --model "davinci:ft-org-domain-2022-12-22-07-26-01"
```

### downloadFile
Returns the contents of the specified file.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `file-id` | `string` | `undefined` | The ID of the file to download. |

#### Example:
```bash
openai downloadFile --file "file-i9DZk2twt4deNezMYtPf1LCN"
```

### listEngines
Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.

#### Example:
```bash
openai listEngines
```
#### Output:
```json
{
  "object": "list"
  "data": [
    {
      "object": "engine",
      "id": "babbage",
      "ready": true,
      "owner": "openai",
      "permissions": null,
      "created": null
    },
    {
      "object": "engine",
      "id": "ada",
      "ready": true,
      "owner": "openai",
      "permissions": null,
      "created": null
    }
  ]
}
```


### listFiles
Returns a list of files that belong to the user's organization.

#### Example:
```bash
openai listFiles
```
#### Output:
```json
{
  "object": "list",
  "data": [
    {
      "object": "file",
      "id": "file-rph3Zutld7ImjVXN9hQhHjc",
      "purpose": "fine-tune-results",
      "filename": "compiled_results.csv",
      "bytes": 1790,
      "created_at": 1671693962,
      "status": "processed",
      "status_details": null
    },
    {
      "object": "file",
      "id": "file-e8DZk4twt8dbNezMYtPf1LCN",
      "purpose": "fine-tune",
      "filename": "twenty-one.jsonl",
      "bytes": 519,
      "created_at": 1671690297,
      "status": "processed",
      "status_details": null
    }
  ]
}
```

### listFineTuneEvents
Get fine-grained status updates for a fine-tune job.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fine-tune-id` | `string` | `undefined` | The ID of the fine-tune job to get events for. |
| `stream` | `boolean` | `false` | Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only server-sent events as they become available. The stream will terminate with a data: [DONE] message when the job is finished (succeeded, cancelled, or failed). |

#### Example:
```bash
openai listFineTuneEvents --fine-tune-id "ft-vMYr5UujI7bKEHmObuHXbtB"
```

### listFineTunes
List your organization's fine-tuning jobs.

#### Example:
```bash
openai listFineTunes
```
#### Output:
```json
{
  "object": "list",
  "data": [
    {
      "object": "fine-tune",
      "id": "ft-XuYr4UujI7bKEHmXb9vHXbtB",
      "hyperparams": {
        "n_epochs": 4,
        "batch_size": 1,
        "prompt_loss_weight": 0.01,
        "learning_rate_multiplier": 0.1
      },
      "organization_id": "org-uik025NZM3fVwbeO4wTFb645",
      "model": "curie",
      "training_files": [
        {
          "object": "file",
          "id": "file-dtIeV15XKVQI80qyMK2pOI7t",
          "purpose": "fine-tune",
          "filename": "training.jsonl",
          "bytes": 501,
          "created_at": 1671655748,
          "status": "deleted",
          "status_details": null
        }
      ],
      "validation_files": [],
      "result_files": [
        {
          "object": "file",
          "id": "file-fQRWLGltMGsRWzsHqO7Krl0m",
          "purpose": "fine-tune-results",
          "filename": "compiled_results.csv",
          "bytes": 1458,
          "created_at": 1671657273,
          "status": "deleted",
          "status_details": null
        }
      ],
      "created_at": 1671656382,
      "updated_at": 1671657273,
      "status": "succeeded",
      "fine_tuned_model": "curie:ft-org-name-2022-12-21-21-14-32"
    }
  ]
}   
```

### listModels
Lists the currently available models, and provides basic information about each one such as the owner and availability.

#### Example:
```bash
openai listModels
```
#### Output:
```json
{
  "object": "list",
  "data": [
    {
      "id": "davinci:ft-org-name-2022-12-22-07-26-01",
      "object": "model",
      "created": 1671693961,
      "owned_by": "org-name",
      "permission": [
        {
          "id": "snapperm-eZpZLBCmKmXs2ccdRtUsmxFV",
          "object": "model_permission",
          "created": 1671693961,
          "allow_create_engine": true,
          "allow_sampling": true,
          "allow_logprobs": true,
          "allow_search_indices": false,
          "allow_view": true,
          "allow_fine_tuning": true,
          "organization": "org-uiEo25NZM3fVwbLT4wTFb456",
          "group": null,
          "is_blocking": false
        }
      ],
      "root": "davinci:2020-05-03",
      "parent": "davinci:2020-05-03"
    }
  ]
}
```

### retrieveEngine
Retrieves a model instance, providing basic information about it such as the owner and availability.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `engine-id` | `string` | `undefined` | The ID of the engine to use for this request. |

#### Example:
```bash
openai retrieveEngine --engine-id "text-search-babbage-query-001"
```
#### Output:
```json
{
  "object": "list",
  "data": [
    {
      "object": "engine",
      "id": "audio-transcribe-001",
      "ready": true,
      "owner": "openai",
      "permissions": null,
      "created": null
    },
    {
      "object": "engine",
      "id": "davinci-similarity",
      "ready": true,
      "owner": "openai-dev",
      "permissions": null,
      "created": null
    }
  ]
}
```

### retrieveFile
Returns information about a specific file.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `file-id` | `string` | `undefined` | The ID of the file to use for this request. |

#### Example:
```bash
openai retrieveFile --file-id "file-i9DZk2twt4deNezMYtPf1LCN"
```
#### Output:
```json
{
  "object": "file",
  "id": "file-e8DZk4twt8dbNezMYtPf1vCN",
  "purpose": "fine-tune",
  "filename": "prompts.jsonl",
  "bytes": 519,
  "created_at": 1671690297,
  "status": "processed",
  "status_details": null
}
```

### retrieveFineTune
Gets info about the fine-tune job.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fine-tune-id` | `string` | `undefined` | The ID of the fine-tune job. |

#### Example:
```bash
openai retrieveFineTune --fine-tune-id "ft-vMYr5UujI7bKEHmObuHXbtB"
```
#### Output:
```json
{
  "object": "fine-tune",
  "id": "ft-ufGTYcH6ofN0mce9xGQeTXE9",
  "hyperparams": {
    "n_epochs": 4,
    "batch_size": 1,
    "prompt_loss_weight": 0.01,
    "learning_rate_multiplier": 0.1
  },
  "organization_id": "org-oij025NZw3fVwbiT4wTFb6k6",
  "model": "davinci",
  "training_files": [
    {
      "object": "file",
      "id": "file-e8DZk4tvt8dbNezMYtPf1LCN",
      "purpose": "fine-tune",
      "filename": "twenty-one.jsonl",
      "bytes": 519,
      "created_at": 1671690297,
      "status": "processed",
      "status_details": null
    }
  ],
  "validation_files": [],
  "result_files": [
    {
      "object": "file",
      "id": "file-Kqpe3Zutld7ImjVXN9hQhHjc",
      "purpose": "fine-tune-results",
      "filename": "compiled_results.csv",
      "bytes": 1790,
      "created_at": 1671693962,
      "status": "processed",
      "status_details": null
    }
  ],
  "created_at": 1671690698,
  "updated_at": 1671693963,
  "status": "succeeded",
  "fine_tuned_model": "davinci:ft-org-name-2022-12-22-07-26-01",
  "events": [
    {
      "object": "fine-tune-event",
      "level": "info",
      "message": "Created fine-tune: ft-rVGTuCH6ofN0mce9xGQeTXE9",
      "created_at": 1671690698
    },
    {
      "object": "fine-tune-event",
      "level": "info",
      "message": "Fine-tune costs $0.01",
      "created_at": 1671690710
    }
  ]
}
```

### retrieveModel
Retrieves a model instance, providing basic information about the model such as the owner and permissioning.

#### Options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `undefined` | The ID of the model to retrieve. |

#### Example:
```bash
openai retrieveModel --model "text-davinci-003"
```
#### Output:
```json
{
  "id": "text-davinci-003",
  "object": "model",
  "created": 1669599635,
  "owned_by": "openai-internal",
  "permission": [
    {
      "id": "modelperm-avGyoQNQYTDulwkeSa6n60ry",
      "object": "model_permission",
      "created": 1671910080,
      "allow_create_engine": false,
      "allow_sampling": true,
      "allow_logprobs": true,
      "allow_search_indices": false,
      "allow_view": true,
      "allow_fine_tuning": false,
      "organization": "*",
      "group": null,
      "is_blocking": false
    }
  ],
  "root": "text-davinci-003",
  "parent": null
}
```

### help [command]
Display help for a specific command.

#### Example:
```bash
openai help createCompletion
```
#### Output:
```bash
Usage: openai-node-cli createCompletion [options]

Creates a completion for the provided prompt and parameters

Options:
  --model <string>             ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them. (default: "text-davinci-003")
  --prompt <strings...>        The prompt(s) to generate completions for, encoded as a string, array of strings, array of tokens, or array of token arrays. (default: "<|endoftext|>")
  --suffix <string>            The suffix that comes after a completion of inserted text. (default: null)
  --max-tokens <integer>       The maximum number of tokens to generate in the completion. (default: 16)
  --temperature <float>        What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined
                               answer. (default: 0)
  --top-p <float>              An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens
                               comprising the top 10% probability mass are considered. (default: 1)
  --n <integer>                How many completions to generate for each prompt. (default: 1)
  --stream <boolean>           Whether to stream back partial progress. If set, tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
                               (default: false)
  --logprobs <integer>         Include the log probabilities on the logprobs most likely tokens, as well the chosen tokens. For example, if logprobs is 5, the API will return a list of the 5 most likely tokens.
                               The API will always return the logprob of the sampled token, so there may be up to logprobs+1 elements in the response. (default: null)
  --echo <boolean>             Echo back the prompt in addition to the completion (default: false)
  --stop <strings...>          Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence. (default: null)
  --presence-penalty <float>   Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
                               (default: 0)
  --frequency-penalty <float>  Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line
                               verbatim. (default: 0)
  --best-of <integer>          Generates best_of completions server-side and returns the 'best' (the one with the highest log probability per token). Results cannot be streamed. (default: 1)
  --user <string>              A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Learn more.
  -h, --help                   display help for command
```

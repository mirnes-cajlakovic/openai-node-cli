#!/usr/bin/env node

const { Command, Option } = require('commander')
const { OpenAIClient } = require('../index')
const commands = require('./commands')

/**
 * Create a new OpenAI client for each command.
 */
const openaiClient = new OpenAIClient(process.env.OPENAI_API_KEY)

/**
 * The main program for the OpenAI CLI.
 */
const program = new Command()

/**
 * Set the name, description, and version of the program.
 */
program
  .name('openai-node-cli')
  .description('The openai command is a command line interface (CLI) for interacting with the OpenAI API. It allows you to perform various operations using the OpenAI API, such as creating completions, images, and embeddings, uploading and downloading files, and managing fine-tune jobs and models.')
  .version('1.0.0')
  .option('--response-format <string>', 'The format to return responses in.', 'json')

/**
 * Iterate through the available commands and add them to the program.
 */
for (const command of commands.sort((a, b) => a.name.localeCompare(b.name))) {
  /**
   * Create a new command with the specified name and description.
   */
  const addCommand = new Command(command.name)
    .description(command.description)

  /**
   * Set the action for the command to make a request to the OpenAI API using the OpenAI client.
   */
  addCommand.action((options, instance) => openaiClient.executeMethod(instance.parent.args[0], options).then(console.log))

  /**
   * Iterate through the command's parameters and add them as options to the command.
   */
  for (const param of command.params) {
    /**
     * Set the flags for the option using the parameter name and type.
     */
    param.flags = '--<flag> <<type>>'
      .replace('<flag>', param.name)
      .replace('<type>', param.type)

    /**
     * Create a new option with the specified flags and description.
     */
    const addOption = new Option(param.flags, param.description)

    /**
     * Set the default value for the option based on the parameter's default value.
     */
    addOption.default(param.default)

    /**
     * If the parameter type is 'integer', parse the default value as an integer and set it as the default value for the option.
     */
    if (param.type === 'integer') {
      addOption.default(parseInt(param.default))
      addOption.argParser((value) => parseInt(value))
    }

    /**
     * If the parameter type is 'float', parse the default value as a float and set it as the default value for the option.
     */
    if (param.type === 'float') {
      addOption.default(parseFloat(param.default))
      addOption.argParser((value) => parseFloat(value))
    }

    /**
     * If the parameter type is 'boolean', parse the default value as a boolean and set it as the default value for the option.
     */
    if (param.type === 'boolean') {
      addOption.default(param.default === 'true')
      addOption.argParser((value) => value === 'true')
    }

    /**
     * If the default value is 'null', set the default value for the option as null.
     */
    if (param.default === 'null') {
      addOption.default(null)
    }

    /**
     * Add the option to the command.
     */
    addCommand.addOption(addOption)
  }

  /**
   * Add the command to the program.
   */
  program.addCommand(addCommand)
}

/**
 * Parse the command line arguments and execute the program.
 */
program.parseAsync()

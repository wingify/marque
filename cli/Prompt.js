const prompt = require('inquirer').createPromptModule();
const Constants = require('../lib/constants');

class Prompt {
  /**
   * Show interactive menu for marque configuration.
   *
   * @returns {Promise<object>} Configuration promise.
   */
  static showMenuAndFetchResults() {
    const questions = [
      {
        type: 'list',
        name: 'type',
        message: 'Where to fetch current tag?',
        choices: [
          'git:     A Distributed version-control system for tracking changes',
          'gcloud:  Google Cloud Platform',
        ],
        filter(type) {
          return type.substr(0, type.indexOf(':'));
        },
      },
      {
        type: 'list',
        name: 'version',
        message: 'Version to increment',
        choices: ['Patch', 'Minor', 'Major'],
      },
      {
        type: 'input',
        name: 'imageName',
        when: ({ type }) => type === Constants.MARQUE_TYPE.GCLOUD,
        message: 'Enter GCP image name:',
      },
    ];

    return prompt(questions);
  }
}

module.exports = Prompt;

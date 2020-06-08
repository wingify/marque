const GlobalValidator = require('./Global');

class GitValidator {
  /**
   * Validates git input configuration and throw error if validation fails.
   *
   * @param {object} param - Params defined below.
   * @param {string} param.version - Version to increment.
   */
  static validate({ version }) {
    GlobalValidator.validate({ command: 'git', version });
  }
}

module.exports = GitValidator;

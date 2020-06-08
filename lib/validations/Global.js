const BashUtil = require('../utils/BashUtil');
const Constants = require('../constants');

class GlobalValidator {
  /**
   * Validates generic global input configuration and throw error if validation fails.
   *
   * @param {object} param - Params defined below.
   * @param {string} param.command - CLI's command name used.
   * @param {string} param.version - Version to increment.
   */
  static validate({ command, version }) {
    if (!BashUtil.doesCommandExist(command)) {
      throw new Error(`Unable to access '${command}'. Make sure it's globally installed.`);
    }

    if (!Object.values(Constants.TAG_TYPES).includes(version)) {
      throw new Error(
        `Invalid tag type specified. Possible values are ${Object.values(Constants.TAG_TYPES).join(', ')}.`
      );
    }
  }
}

module.exports = GlobalValidator;

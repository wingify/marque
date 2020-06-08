var commandExistsSync = require('command-exists').sync;

class BashUtil {
  /**
   * Checks whether the input command exists on current system of not.
   *
   * @param {string} command - Command name
   * @returns {boolean} - true/false for whether the command is accessible or not.
   */
  static doesCommandExist(command) {
    return commandExistsSync(command);
  }
}

module.exports = BashUtil;

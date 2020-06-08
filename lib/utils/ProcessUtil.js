const Constants = require('../constants');

class ProcessUtil {
  /**
   * Extract and format node process arguments.
   *
   * @returns {{ type, limit, imageName, version }} Formatted argument values.
   */
  static extractArgv() {
    const result = {
      type: undefined,
      limit: undefined,
      imageName: undefined,
      version: undefined,
    };

    process.argv.slice(2).forEach((arg) => {
      const value = arg.toLowerCase();

      if (value.includes('=')) {
        let [key, val = ''] = value.split('=');
        key = key.replace(/\W/g, '');
        result[key] = val.trim() || true;
      } else if (Object.values(Constants.MARQUE_TYPE).includes(value)) {
        result.type = value;
      } else if (Object.values(Constants.TAG_TYPES).includes(value)) {
        result.version = value;
      } else {
        result.imageName = value;
      }
    });

    return result;
  }
}

module.exports = ProcessUtil;

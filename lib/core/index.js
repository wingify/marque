const GCloudValidator = require('../validations/Gcloud');
const GitValidator = require('../validations/Git');
const GCloudCore = require('./Gcloud');
const GitCore = require('./Git');
const Constants = require('../constants');

class Marque {
  /**
   * Fetch and increment the latest tag as per the configuration.
   *
   * @param {object} param - Params defined below.
   * @param {string} param.type - Platform type git/gcloud.
   * @param {string} param.limit - Number of tags to fetch from gcloud.
   * @param {string} param.imageName - GCP image name.
   * @param {string} param.version - Version to increment.
   *
   * @returns {string} Incremented tag value
   */
  static increment({
    type = Constants.MARQUE_TYPE.GIT,
    limit,
    imageName = '',
    version = Constants.TAG_TYPES.PATCH,
  } = {}) {
    type = type.toLowerCase();
    version = version.toLowerCase();
    limit = Number(limit) || Constants.DEFAULTS.LIMIT;

    switch (type) {
      case Constants.MARQUE_TYPE.GCLOUD:
        return Marque._gCloudTag({ version, imageName, limit });
      case Constants.MARQUE_TYPE.GIT:
        return Marque._gitTag({ version });
      default:
        throw new Error(
          `Invalid type specified. Possible values are ${Object.values(Constants.MARQUE_TYPE).join(', ')}.`
        );
    }
  }

  static _gCloudTag({ version, imageName, limit }) {
    GCloudValidator.validate({ version, imageName });
    return GCloudCore.increment({ version, imageName, limit });
  }

  static _gitTag({ version }) {
    GitValidator.validate({ version });
    return GitCore.increment({ version });
  }
}

module.exports = Marque;

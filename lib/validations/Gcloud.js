const GlobalValidator = require('./Global');

class GCloudValidator {
  /**
   * Validates gcloud input configuration and throw error if validation fails.
   *
   * @param {object} param - Params defined below.
   * @param {string} param.imageName - GCP image name.
   * @param {string} param.version - Version to increment.
   */
  static validate({ imageName, version }) {
    GlobalValidator.validate({ command: 'gcloud', version });

    if (!imageName) {
      throw new Error('Image name is mandatory.');
    }
  }
}

module.exports = GCloudValidator;

const execSync = require('child_process').execSync;
const TagUtil = require('../utils/TagUtil');
const Constants = require('../constants');

class GCloudCore {
  /**
   * Increments the latest tag of GCP.
   *
   * @param {object} param - Params defined below.
   * @param {string} param.imageName - GCP image name.
   * @param {string} param.version - Version to increment.
   * @param {string} param.limit - Number of tags to fetch from gcloud.
   *
   * @returns {string} Incremented tag value
   */
  static increment({ imageName, version, limit }) {
    const stringifiedTags = GCloudCore._fetchTagsFromGCP({ imageName, limit });

    try {
      const tags = GCloudCore._extractTags(stringifiedTags);
      const tag = TagUtil.getMaxTag(tags);

      return TagUtil.incrementTag(tag, version);
    } catch (e) {
      console.log(e);
      // Use default tag in case of error.
    }

    // Return default tag if none already exists.
    return Constants.DEFAULTS.TAG;
  }

  /**
   * Fetch last few tag entries from GCP.
   *
   * @param {object} param - Params defined below.
   * @param {string} param.imageName - GCP image name.
   * @param {string} param.limit - Number of tags to fetch from gcloud.
   *
   * @returns {object[]} Tags json
   */
  static _fetchTagsFromGCP({ imageName, limit }) {
    return execSync(`gcloud container images list-tags ${imageName} --limit=${limit} --format=json`, {
      stdio: ['pipe', 'pipe', 'ignore'],
    }).toString();
  }

  /**
   * Extract tags from GCP's tags stringified JSON.
   *
   * @param {string} stringifiedTags - Stringified tags JSON.
   *
   * @returns {string[]} List of tags.
   */
  static _extractTags(stringifiedTags) {
    return stringifiedTags ? JSON.parse(stringifiedTags).reduce((acc, { tags }) => acc.concat(tags), []) : [];
  }
}

module.exports = GCloudCore;

const Constants = require('../constants');

class TagUtil {
  /**
   * Finds the max tag value from a given tags array.
   *
   * @param {string[]} tags List of tags like ['0.0.1', '0.0.4', '1.2.4', 'latest']
   * @returns {string} Max tag value like '1.2.4'
   */
  static getMaxTag(tags = []) {
    let maxTag = '0.0.0';
    let maxTagWeight = maxTag
      .split('.')
      .reduce((acc, val, idx) => acc + val * Constants.MAX_TAGS_LEVEL ** (3 - idx), 0);

    tags.forEach((tag) => {
      if (Constants.VERSONING_REGEX.test(tag)) {
        const [_, prefix = '', major = 0, minor = 0, patch = 0] = Constants.VERSONING_REGEX.exec(tag);

        const currentTagWeight =
          major * Constants.MAX_TAGS_LEVEL ** 3 +
          minor * Constants.MAX_TAGS_LEVEL ** 2 +
          patch * Constants.MAX_TAGS_LEVEL ** 1;

        if (currentTagWeight > maxTagWeight) {
          maxTag = `${prefix}${major}.${minor}.${patch}`;
          maxTagWeight = currentTagWeight;
        }
      }
    });

    return maxTag;
  }

  /**
   * Increments the input tag as per the version type.
   *
   * @param {string} tag - Tag value.
   * @param {string} version - Version to increment.
   *
   * @returns {string} - Incremented tag value.
   */
  static incrementTag(tag = Constants.DEFAULTS.TAG, version = Constants.TAG_TYPES.PATCH) {
    let [prefix = '', major = 0, minor = 0, patch = 0] = Constants.VERSONING_REGEX.exec(tag).slice(1);

    switch (version) {
      case Constants.TAG_TYPES.PATCH:
        patch++;
        break;
      case Constants.TAG_TYPES.MINOR:
        patch = 0;
        minor++;
        break;
      case Constants.TAG_TYPES.MAJOR:
        patch = 0;
        minor = 0;
        major++;
        break;
      default:
        throw new Error(
          `Invalid tag type specified. Possible values are ${Object.values(Constants.TAG_TYPES).join(', ')}.`
        );
    }

    return `${prefix}${major}.${minor}.${patch}`;
  }
}

module.exports = TagUtil;

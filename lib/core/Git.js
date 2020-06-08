const execSync = require('child_process').execSync;
const TagUtil = require('../utils/TagUtil');

class GitCore {
  /**
   * Increments the latest tag of Git.
   *
   * @param {object} param - Params defined below.
   * @param {string} param.version - Version to increment.
   *
   * @returns {string} Incremented tag value
   */
  static increment({ version }) {
    const currentTag = GitCore._fetchGitTag();
    return TagUtil.incrementTag(currentTag, version);
  }

  /**
   * Fetch latest git tag.
   *
   * @returns {string} - Latest tag.
   */
  static _fetchGitTag() {
    try {
      return execSync(`git describe --abbrev=0`, { stdio: ['pipe', 'pipe', 'ignore'] });
    } catch (_e) {}
  }
}

module.exports = GitCore;

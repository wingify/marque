module.exports = {
  MARQUE_TYPE: {
    GIT: 'git',
    GCLOUD: 'gcloud',
  },

  /**
   * Took reference from semver (https://semver.org/) to:
   * Get the versioning regex
   * Author - Tom Preston-Werner (https://tom.preston-werner.com/)
   * Source - https://semver.org/
   */
  VERSONING_REGEX: /^(v)?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/m,
  MAX_TAGS_LEVEL: 100000,
  TAG_TYPES: {
    PATCH: 'patch',
    MINOR: 'minor',
    MAJOR: 'major',
  },
  DEFAULTS: {
    TAG: '0.0.0',
    LIMIT: 10,
  },
};

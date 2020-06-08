#!/usr/bin/env node
const ProcessUtil = require('../lib/utils/ProcessUtil');
const MarqueCore = require('../lib/core');
const Prompt = require('./Prompt');

class MarqueCLI {
  /**
   * Execute Marque via CLI.
   * It Shows interactive menu or directly executes as per the input.
   */
  static execute() {
    if (process.argv.length <= 2) {
      Prompt.showMenuAndFetchResults().then((params) => MarqueCLI._getIncrementedVersion(params));
    } else {
      const params = ProcessUtil.extractArgv();
      MarqueCLI._getIncrementedVersion(params);
    }
  }

  /**
   * Stdout the incremented tag version.
   *
   * @param {object} params - CLI formatted arguments
   */
  static _getIncrementedVersion(params) {
    try {
      const newTag = MarqueCore.increment(params);
      console.log(newTag);
    } catch (e) {
      console.log(e.toString());
    }
  }
}

MarqueCLI.execute();

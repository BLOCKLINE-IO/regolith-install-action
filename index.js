const path = require('path');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const exec = require("@actions/exec");
const { getDownloadObject } = require('./lib/utils');
const os = require('os');

async function setup() {
  try {
    // Get version of tool to be installed
    const version = core.getInput('version');

    // Download the specific version of the tool, e.g. as a tarball/zipball
    const download = getDownloadObject(version); // url
    const pathToTarball = await tc.downloadTool(download);

    // Extract the tarball/zipball onto host runner
    const platform = os.platform();
    const extract = download.endsWith('.zip') ? tc.extractZip : tc.extractTar;
    const pathToCLI = await extract(pathToTarball);
    if (platform != 'win32') {
      exec.exec(`chmod u+x ${path.join(pathToCLI, 'regolith')}`);
    }

    // Expose the tool by adding it to the PATH
    core.addPath(path.join(pathToCLI));
  } catch (e) {
    core.setFailed(e);
  }
}

module.exports = setup

if (require.main === module) {
  setup();
}
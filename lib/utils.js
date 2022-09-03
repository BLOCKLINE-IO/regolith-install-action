// author: https://github.com/github-developer/example-setup-gh

const os = require('os');
const path = require('path');

// arch in [arm, x32, x64...] (https://nodejs.org/api/os.html#os_os_arch)
// return value in [amd64, 386, arm]
function mapArch(arch) {
  const mappings = {
    x32: 'x86',
    x64: 'x86_64',
    arm: 'armv7'
  };
  return mappings[arch] || arch;
}

// os in [darwin, linux, win32...] (https://nodejs.org/api/os.html#os_os_platform)
// return value in [darwin, linux, windows]
function mapOS(os) {
  const mappings = {
    darwin: 'Darwin',
    win32: 'Windows',
    linux: 'Linux'
  };
  return mappings[os] || os;
}

function getDownloadObject(version) {
  const platform = os.platform();
  const filename = `regolith_${ version }_${ mapOS(platform) }_${ mapArch(os.arch()) }`;
  const extension = platform === 'win32' ? 'zip' : 'tar.gz';
  const url = `https://github.com/Bedrock-OSS/regolith/releases/download/${ version }/${ filename }.${ extension }`;
  return url;
}

module.exports = { getDownloadObject }
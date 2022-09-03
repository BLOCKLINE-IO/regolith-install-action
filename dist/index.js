/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 307:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const path = __nccwpck_require__(17);
const core = __nccwpck_require__(202);
const tc = __nccwpck_require__(823);
const exec = __nccwpck_require__(610);
const { getDownloadObject } = __nccwpck_require__(462);

async function setup() {
  try {
    // Get version of tool to be installed
    const version = core.getInput('version');

    // Download the specific version of the tool, e.g. as a tarball/zipball
    const download = getDownloadObject(version);
    const pathToTarball = await tc.downloadTool(download.url);

    // Extract the tarball/zipball onto host runner
    const extract = download.url.endsWith('.zip') ? tc.extractZip : tc.extractTar;
    const pathToCLI = await extract(pathToTarball);
    exec.exec(`chmod u+x ${download.binPath}`);

    // Expose the tool by adding it to the PATH
    core.addPath(path.join(pathToCLI, download.binPath));
  } catch (e) {
    core.setFailed(e);
  }
}

module.exports = setup

if (require.main === require.cache[eval('__filename')]) {
  setup();
}

/***/ }),

/***/ 462:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// author: https://github.com/github-developer/example-setup-gh

const os = __nccwpck_require__(37);
const path = __nccwpck_require__(17);

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
  const binPath = platform === 'win32' ? path.join(filename, 'regolith.exe') : path.join(filename, 'regolith');
  const url = `https://github.com/Bedrock-OSS/regolith/releases/download/${ version }/${ filename }.${ extension }`;
  return {
    url,
    binPath
  };
}

module.exports = { getDownloadObject }

/***/ }),

/***/ 202:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 610:
/***/ ((module) => {

module.exports = eval("require")("@actions/exec");


/***/ }),

/***/ 823:
/***/ ((module) => {

module.exports = eval("require")("@actions/tool-cache");


/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(307);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
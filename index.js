const core = require("@actions/core");
const exec = require("@actions/exec");
const tc = require("@actions/tool-cache");
const io = require("@actions/io");

async function run() {
    const url = "https://github.com/Bedrock-OSS/regolith/releases/download/0.0.17/regolith_0.0.17_Linux_x86_64.tar.gz";

    const downloadPath = await tc.downloadTool(url);

    const regolithExtracted = await tc.extractTar(downloadPath)
    await exec.exec(`rm regolith_0.0.17_Linux_x86_64.tar.gz`);
    await exec.exec(`rm LICENSE`);
    await exec.exec(`rm LICENSE.rtf`);
    await exec.exec(`rm README.md`);
    await exec.exec(`chmod u+x ${regolithExtracted}`);
    await io.mv(regolithExtracted, "/usr/local/bin");
    exec.exec("regolth --help");
}

run().catch(function(error) {
    core.setFailed(`Action error: ${error}`);
});
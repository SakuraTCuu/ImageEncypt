
const { startEncrypt, startDecrypt, startCompress } = require("./src/encypt_img");

async function main() {
    await startCompress();
    startEncrypt();
    startDecrypt();
}

main();

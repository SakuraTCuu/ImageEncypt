const fs = require('fs');
const Path = require("path");
const PngQuant = require('pngquant');
const MemoryStream = require('memory-stream');
const Config = require("../config.js");

//压缩
async function compress(imgName) {

    return new Promise((resolve, reject) => {
        let imgPath = Path.join(Config.imgPath, imgName);
        let outPath = Path.join(Config.compressPath, imgName);

        console.log(`开始压缩 ${imgPath}`);

        const sourceStream = fs.createReadStream(imgPath);
        const destinationStream = new MemoryStream();
        const myPngQuanter = new PngQuant([192, '--quality', '60-80', '--nofs', '-']);
        sourceStream.pipe(myPngQuanter).pipe(destinationStream);

        destinationStream.on('finish', function () {

            let data = destinationStream.toBuffer();
            fs.writeFileSync(outPath, data);
            console.log(`结束压缩 ${outPath}`);

            resolve();
        });
    });
}

module.exports = {
    compress
}
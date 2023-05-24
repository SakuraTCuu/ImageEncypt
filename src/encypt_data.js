const Config = require("../config.js");

function printInfo() {
    let info = "";
    info += "=========================info==============================\n";
    info += "key              " + Config.key + "\n";
    info += "keyBuffer        " + getKeyBuffer() + "\n";
    info += "iv               " + Config.iv + "\n";
    info += "prefix           " + Config.encypt_prefix + "\n";
    info += "imgPath          " + Config.imgPath + "\n";
    info += "outPath          " + Config.outPath + "\n";
    info += "=========================info==============================";
    console.log(info);
}

/**
 * 获取keyBuffer
 * @returns 
 */
function getKeyBuffer() {
    let keyBuff = Buffer.from(Config.key);
    return keyBuff;
}

/**
 * 
 * @param {Buffer}  originBuffer  源数据
 */
function encryptBuffer(originBuffer) {
    let keyBuff = getKeyBuffer();
    //加点东西 直接拼接
    let buffer = Buffer.concat([keyBuff, originBuffer]);
    buffer = buffer.reverse();
    return buffer;

    // console.log(originBuffer.byteLength);

    // let tempBuffer = Buffer.alloc(0);
    // let sBuffer = Buffer.alloc(1).fill(1);
    // for (let i = 0; i < originBuffer.byteLength; i += 128) {
    //     let end = i + 128;
    //     if (end >= originBuffer.byteLength) {
    //         end = originBuffer.byteLength;
    //     }
    //     tempBuffer = Buffer.concat([tempBuffer, sBuffer, originBuffer.subarray(i, end)]);
    // }
    // console.log(tempBuffer.byteLength);
    // tempBuffer = tempBuffer.reverse();

    // return tempBuffer;
}

/**
 * 
 * @param {Buffer} encyptBuffer 加密过的数据
 */
function decryptBuffer(encyptBuffer) {
    let keyBuff = getKeyBuffer();
    let byteLen = keyBuff.byteLength;

    let buffer = encyptBuffer.reverse();
    buffer = buffer.subarray(byteLen);

    return buffer;


    // console.log(encyptBuffer.byteLength);

    // encyptBuffer = encyptBuffer.reverse();

    // let tempBuffer = Buffer.alloc(0);
    // for (let i = 0; i < encyptBuffer.byteLength; i += 129) {
    //     let end = i + 129;
    //     if (end >= encyptBuffer.byteLength) {
    //         end = encyptBuffer.byteLength;
    //     }
    //     tempBuffer = Buffer.concat([tempBuffer, encyptBuffer.subarray(i + 1, end)]);
    // }
    // console.log(tempBuffer.byteLength);

    // return tempBuffer;
}

module.exports = {
    encryptBuffer,
    decryptBuffer,
    printInfo
}
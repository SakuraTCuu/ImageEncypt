const Config = require("../config.js");

function printInfo() {
    let info = "";
    info += "=========================info==============================\n";
    info += "key              " + Config.key + "\n";
    info += "keyBuffer        " + getKeyBuffer() + "\n";
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
}

module.exports = {
    encryptBuffer,
    decryptBuffer,
    printInfo
}
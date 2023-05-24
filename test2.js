const { encryptBuffer,
    decryptBuffer,
    printInfo } = require("./src/encypt_data.js");


/**
 * 加密单个图片
 * @param {*} imgName 图片名
 * @param {*} callback 
 */
function encryptImg() {
    let dataBuffer = Buffer.alloc(40);
    dataBuffer.fill(0);
    console.log(dataBuffer);
    let encBuffer = encryptBuffer(dataBuffer);
    console.log(encBuffer);
    return encBuffer;
}

/**
 * 解密图片
 * @param {*} imgPath 
 * @param {*} callback 
 */
function decryptImg(dataBuffer) {

    let decBuffer = decryptBuffer(dataBuffer);

    console.log(decBuffer);
}

// let dataBuffer = Buffer.alloc(40);
// console.log(dataBuffer.subarray(0,10));

decryptImg(encryptImg());
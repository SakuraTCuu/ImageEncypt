const CryptoJS = require("crypto-js");
const Config = require("../config.js");

let key = CryptoJS.enc.Utf8.parse(Config.key);
let iv = CryptoJS.enc.Utf8.parse(Config.iv);

function printInfo() {
    let info = "";
    info += "=========================info==============================\n";
    info += "key              " + Config.key + "\n";
    info += "Base64(key)      " + CryptoJS.enc.Base64.stringify(key) + "\n";
    info += "iv               " + Config.iv + "\n";
    info += "Base64(iv)       " + CryptoJS.enc.Base64.stringify(iv) + "\n";
    info += "prefix           " + Config.prefix + "\n";
    info += "Base64(prefix)   " + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(Config.prefix)) + "\n";
    info += "imgPath          " + Config.imgPath + "\n";
    info += "outPath          " + Config.outPath + "\n";
    info += "=========================info==============================";

    console.log(info);
}

/**
 * 
 * @param {*} originStr  源数据
 */
function encyptData(originStr) {

    let encrypt = CryptoJS.AES.encrypt(originStr, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
        iv: iv
    });

    let encyptStr = encrypt.toString();
    return encyptStr;
}

/**
 * 
 * @param {*} encyptStr 加密过的数据
 */
function decyptData(encyptStr) {

    let decrypt = CryptoJS.AES.decrypt(encyptStr, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
        iv: iv
    });

    let originStr = decrypt.toString(CryptoJS.enc.Utf8);
    return originStr;
}

module.exports = {
    encyptData,
    decyptData,
    printInfo
}
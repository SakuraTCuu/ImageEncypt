const path = require("path");

const Config = {
    key: "0123456789abcdef", //密钥
    iv: "0123456789abcdef",
    encypt_prefix: "encypt", //加密的固定前缀, 用于识别

    suffix: ".png", //加密文件的后缀名
    imgPath: path.join(__dirname, "assets/img"), //源图片路径
    compressPath: path.join(__dirname, "assets/compress"), //压缩后图片路径
    outPath: path.join(__dirname, "assets/out"), //加密后的图片路径
    decPath: path.join(__dirname, "assets/dec"), //解密后的图片路径

    debug: true,
}

module.exports = Config;
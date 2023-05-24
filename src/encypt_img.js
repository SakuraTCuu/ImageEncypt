const Config = require("../config.js");
const Path = require("path");
const fs = require("fs");
const { encryptBuffer,
    decryptBuffer,
    printInfo } = require("./encypt_data.js");

const { compress } = require("./compress_img.js");

/**
 * 读指定目录下的后缀名文件
 * @param {*} folder 
 * @param {*} callback 
 */
function loadFileNameByPath4Ext(dirPath, exts) {

    if (!dirPath) {
        return;
    }

    let arrFiles = []
    const files = fs.readdirSync(dirPath);

    for (let i = 0; i < files.length; i++) {
        const item = files[i]
        const stat = fs.lstatSync(Path.join(dirPath, item))
        if (stat.isDirectory() === true) {
            arrFiles.push(...loadFileNameByPath4Ext(Path.join(dirPath, item), exts))
        } else {
            if (exts != undefined && exts != null && exts.length > 0) {
                for (let j = 0; j < exts.length; j++) {
                    let ext = exts[j];
                    if (Path.extname(item) === ext) {
                        arrFiles.push(Path.join(dirPath, item))
                        break;
                    }
                }
            } else {
                arrFiles.push(Path.join(dirPath, item))
            }
        }
    }

    return arrFiles;
}

/**
 * 创建目录
 * @param {*} filePath 文件绝对路径
 */
function createFolder(rootPath, relativePath) {
    //拼接输出目录
    let outPath = Path.join(rootPath, relativePath);
    let outFolder = Path.dirname(outPath);
    fs.mkdirSync(outFolder, { recursive: true });
}


/**
 * 开始压缩
 */
async function startCompress() {
    console.log("---------------------压缩开始---------------------");
    console.time("压缩耗时");
    let arrFiles = loadFileNameByPath4Ext(Config.imgPath, [Config.suffix]);

    for (let i = 0; i < arrFiles.length; i++) {
        let relativePath = Path.relative(Config.imgPath, arrFiles[i]);
        //创建输出目录
        createFolder(Config.compressPath, relativePath);
        //加密图片
        await compress(relativePath);
    }
    console.timeEnd("压缩耗时");
    console.log("---------------------压缩结束---------------------");
}

/**
 * 开始加密
 */
function startEncrypt() {
    printInfo();
    console.log("---------------------加密开始---------------------");
    console.time("加密耗时");
    let arrFiles = loadFileNameByPath4Ext(Config.compressPath, [Config.suffix]);

    for (let i = 0; i < arrFiles.length; i++) {
        let relativePath = Path.relative(Config.compressPath, arrFiles[i]);
        //创建输出目录
        createFolder(Config.outPath, relativePath);
        //加密图片
        encryptImg(relativePath);
    }
    console.timeEnd("加密耗时");
    console.log("---------------------加密结束---------------------");
}

/**
 * 解密
 */
function startDecrypt() {
    console.log("---------------------解密开始---------------------");
    console.time("解密耗时");
    let arrFiles = loadFileNameByPath4Ext(Config.outPath, [Config.suffix]);

    for (let i = 0; i < arrFiles.length; i++) {
        let relativePath = Path.relative(Config.outPath, arrFiles[i]);
        //创建输出目录
        createFolder(Config.decPath, relativePath);
        //解密图片
        decryptImg(relativePath);
    }
    console.timeEnd("解密耗时");
    console.log("---------------------解密结束---------------------");
}

/**
 * 加密单个图片
 * @param {*} imgName 图片名
 * @param {*} callback 
 */
function encryptImg(imgName) {
    let imgPath = Path.join(Config.compressPath, imgName);
    let outPath = Path.join(Config.outPath, imgName);

    console.log(`开始加密 ${imgPath}`);

    let dataBuffer = fs.readFileSync(imgPath);
    let encBuffer = encryptBuffer(dataBuffer);
    fs.writeFileSync(outPath, encBuffer);

    console.log(`加密成功 ${outPath}`);
}

/**
 * 解密图片
 * @param {*} imgPath 
 * @param {*} callback 
 */
function decryptImg(imgName) {

    let imgPath = Path.join(Config.outPath, imgName);
    let decPath = Path.join(Config.decPath, imgName);

    console.log(`开始解密 ${imgPath}`);

    let dataBuffer = fs.readFileSync(imgPath);
    let decBuffer = decryptBuffer(dataBuffer);
    fs.writeFileSync(decPath, decBuffer);

    console.log(`解密成功 ${decPath}`);
}

module.exports = {
    startDecrypt,
    startEncrypt,
    startCompress,
    encryptImg,
    decryptImg
}
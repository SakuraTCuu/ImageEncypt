const Config = require("../config.js");
const Path = require("path");
const fs = require("fs");
const { encyptData,
    decyptData,
    printInfo } = require("./encypt_data.js");

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
function createFolder(relativePath) {
    //拼接输出目录
    let outPath = Path.join(Config.outPath, relativePath);
    let outFolder = Path.dirname(outPath);
    fs.mkdirSync(outFolder, { recursive: true });
}

/**
 * 程序入口, 开始加密
 */
function startEncypt() {
    console.log("---------------------加密开始---------------------");

    let arrFiles = loadFileNameByPath4Ext(Config.imgPath, [Config.suffix]);

    for (let i = 0; i < arrFiles.length; i++) {
        let relativePath = Path.relative(Config.imgPath, arrFiles[i]);
        //创建输出目录
        createFolder(relativePath);
        //加密图片
        encyptImg(relativePath);
    }

    console.log("---------------------加密结束---------------------");
}

/**
 * 解密
 */
function startDecypt() {
    let arrFiles = loadFileNameByPath4Ext(Config.outPath, [Config.suffix]);

    for (let i = 0; i < arrFiles.length; i++) {
        let relativePath = Path.relative(Config.outPath, arrFiles[i]);
        //加密图片
        decyptImg(relativePath);
    }
}

/**
 * 加密单个图片
 * @param {*} imgName 图片名
 * @param {*} callback 
 */
function encyptImg(imgName) {
    let imgPath = Path.join(Config.imgPath, imgName);
    let outPath = Path.join(Config.outPath, imgName);

    console.log(`开始加密 ${imgPath}`);

    // let data = fs.readFileSync(imgPath, 'binary');

    // console.log(": " + data.length + " characters, " +
    //     Buffer.byteLength(data, 'utf8') + " bytes");

    let data = fs.readFileSync(imgPath);

    console.log(": " + data.length + " characters, " +
        Buffer.byteLength(data, 'utf8') + " bytes");

    return;
    let encryptData = encyptData(data);
    let dataBuffer = Buffer.from(encryptData, 'base64');

    fs.writeFileSync(outPath, dataBuffer, { encoding: "binary", flag: 'w+' });

    console.log(`加密成功 ${outPath}`);
}

/**
 * 解密图片
 * @param {*} imgPath 
 * @param {*} callback 
 */
function decyptImg(imgName) {

    let imgPath = Path.join(Config.outPath, imgName);
    let decPath = Path.join(Config.decPath, imgName);

    console.log(`开始解密 ${imgPath}`);

    // let data = fs.readFileSync(imgPath, 'binary');
    let data = fs.readFileSync(imgPath, 'ascii');
    console.log(": " + data.length + " characters, " +
        Buffer.byteLength(data, 'utf8') + " bytes");

    const buffer = Buffer.from(data, 'ascii');
    const base64Data = buffer.toString('base64');
    let result = decyptData(base64Data);

    fs.writeFileSync(decPath, result, "binary");

    console.log(`解密成功 ${decPath}`);
}

module.exports = {
    startDecypt,
    startEncypt,
    encyptImg,
    decyptImg
}
const crypto = require('crypto');

const key = Buffer.from('0123456789abcdef0123456789abcdef', 'hex'); // 密钥，16 字节
// const iv = Buffer.from('0123456789abcdef', 'hex'); // IV，16 字节
const iv = crypto.randomBytes(16); // 随机生成 16 字节的 IV

const plaintextBuffer = Buffer.from('Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!'); // 明文的 Buffer 数据

console.log("加密前: ", plaintextBuffer.byteLength);
const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
const encryptedBuffer = Buffer.concat([cipher.update(plaintextBuffer), cipher.final()]);

console.log('加密后:', encryptedBuffer.byteLength);

const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
const decryptedBuffer = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);

console.log('Decrypted data:', decryptedBuffer.byteLength);

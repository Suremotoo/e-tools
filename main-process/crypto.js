/**
 * @加密模块
 */
//导入模块
const crypto = require('crypto');
const querystring = require('querystring');
const fs = require('fs');

/**
 * [生成哈希加密] (加密固定,不可逆)
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
let getHash = (str, type) => {
    var hash = crypto.createHash(type);
    hash.update(str);
    var res = hash.digest("hex"); //加密后的值d
    return res;
}


/**
 * @aes192加密模块
 * @param str string 要加密的字符串
 * @param secret string 要使用的加密密钥(要记住,不然就解不了密啦)
 * @retrun string 加密后的字符串
 */
exports.getEncAse192 = (str, secret) => {
    var cipher = crypto.createCipher("aes192", secret); //设置加密类型 和 要使用的加密密钥
    var enc = cipher.update(str, "utf8", "hex"); //编码方式从utf-8转为hex;
    enc += cipher.final("hex"); //编码方式从转为hex;
    return enc; //返回加密后的字符串
}
/**
 * @aes192解密模块
 * @param str string 要解密的字符串
 * @param secret string 要使用的解密密钥(要和密码的加密密钥对应,不然就解不了密啦)
 * @retrun string 解密后的字符串
 */
exports.getDecAse192 = (str, secret) => {
    var decipher = crypto.createDecipher("aes192", secret);
    var dec = decipher.update(str, "hex", "utf8"); //编码方式从hex转为utf-8;
    dec += decipher.final("utf8"); //编码方式从utf-8;
    return dec;
}
/**
 * @Hmac-sha1加密模块 (每次加密随机,不可逆)
 * @param str string 要加密的字符串
 * @param secret string 要使用的加密密钥
 * @retrun string 加密后的字符串
 */
exports.getHmac = (str, secret) => {
    var buf = crypto.randomBytes(16);
    secret = buf.toString("hex"); //密钥加密；
    var Signture = crypto.createHmac("sha1", secret); //定义加密方式
    Signture.update(str);
    var miwen = Signture.digest().toString("base64"); //生成的密文后将再次作为明文再通过pbkdf2算法迭代加密；
    return miwen;
}

/**
 * [getMD5 md5加密]
 * @param  {[type]} str [要加密的字符串]
 * @return {[type]}     [加密后的字符串]
 */
exports.getMD5 = (str) => {
    return getHash(str, "md5");
}

/**
 * @sha1加密模块 (加密固定,不可逆)
 * @param str string 要加密的字符串
 * @retrun string 加密后的字符串
 */
exports.getSha1 = (str) => {
    return getHash(str, "sha1");
}

/**
 * [getSha256 sha256]
 * @param  {[type]} str [要加密的字符串]
 * @return {[type]}     [加密后的字符串]
 */
exports.getSha256 = (str) => {
    return getHash(str, "sha256");
}

/**
 * [getSha512 sha512]
 * @param  {[type]} str [要加密的字符串]
 * @return {[type]}     [加密后的字符串]
 */
exports.getSha512 = (str) => {
    return getHash(str, "sha512");
}

/**
 * [普通Base64加密]
 * @param  {[type]} str [要加密的字符串]
 * @return {[type]}     [加密后的字符串]
 */
exports.getEncBase64 = (str) => {
    return Buffer.from(str).toString('base64');
}

/**
 * [普通Base64解密]
 * @param  {[type]} str [要解密的字符串]
 * @return {[type]}     [解密后的字符串]
 */
exports.getDecBase64 = (str) => {
    return Buffer.from(str, 'base64').toString();
}

/**
 * [Base64加密16进制]
 * @param  {[type]} str [要加密的字符串]
 * @return {[type]}     [加密后的字符串]
 */
exports.getEncBase64Hex = (str) => {
    return Buffer.from(str, 'base64').toString('hex');
}

/**
 * [Base64解密16进制]
 * @param  {[type]} str [要解密的字符串]
 * @return {[type]}     [解密后的字符串]
 */
exports.getDecBase64Hex = (str) => {
    return Buffer.from(str, 'hex').toString('utf8');
}


/**
 * [图片转Base64加密]
 * @param  {[type]} file [要加密的图片]
 * @return {[type]}     [加密后的字符串]
 */
exports.getPic2Base64 = (file) => {
    let bitmap = fs.readFileSync(file);
    return Buffer.from(bitmap).toString('base64');
}

/**
 * [Base64转图片解密]
 * @param  {[type]} base64str [图片加密后的 base64 字符串]
 * @param  {[type]} file      [解密后的图片]
 * @return {[type]}           [description]
 */
exports.getPic2Base64 = (base64str, file) => {
    var bitmap = Buffer.from(base64str, 'base64');
    fs.writeFileSync(file, bitmap);
}

/**
 * [escape 加密]
 * @param  {[type]} str [待加密的字符串]
 * @return {[type]}     [description]
 */
exports.getEncEscape = (str) => {
    return querystring.escape(str);
}

/**
 * [escape 解密]
 * @param  {[type]} str [待解密的字符串]
 * @return {[type]}     [description]
 */
exports.getDecEscape = (str) => {
    return querystring.unescape(str);
}
var crypto = require('crypto');

var secret = 'uop';
var str = '123456789afdba';

var cipher = crypto.createCipher("aes192", secret); //设置加密类型 和 要使用的加密密钥
// var enc = cipher.update(str, "utf8", "hex");    //编码方式从utf-8转为hex;
// enc += cipher.final("hex"); //编码方式从转为hex;

var enc = cipher.update(str, "utf8", "hex") + cipher.final("hex");
console.log('enc=', enc);


var decipher = crypto.createDecipher("aes192", secret);
// var dec = decipher.update(enc, "hex", "utf8");//编码方式从hex转为utf-8;
// dec += decipher.final("utf8");//编码方式从utf-8;
var dec = decipher.update(enc, "hex", "utf8") + decipher.final("utf8");
console.log('dec=', dec);



const CryptoJS = require('crypto-js');

const text = CryptoJS.AES.encrypt(
    // 'show databases',
    // 'select * from user where user.id = "zhangsan"',
    encodeURIComponent("select * from db.`user_role` where db.`user_role`.name like '张%'"),
    CryptoJS.enc.Utf8.parse('q7s5c3o3k2m1n5h9'),
    {
	iv: CryptoJS.enc.Utf8.parse('q1w2e3r4t5y6u7i8'),
	mode: CryptoJS.mode.CBC,
	// padding: CryptoJS.pad.Pkcs7
	padding: CryptoJS.pad.Iso10126
    }
).toString();

console.log(text);

const NodeRSA = require('node-rsa');

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCMx4ECplWsdCqwiiR/8OsszlDN+ecD9TVTkBbziuu+alb58P2ByW5Cr3nxbn7UKJJcbT+1NZG9dsYbXhnluLd+gUETGmIyeCwdBjWqePtqFG9CZUEeWSvineFw0AEPfWxmOnsZ4oOgw56kSbfXMM2H++PC1jwVyMACgAxrD3oG4QIDAQAB';

const key = new NodeRSA(`-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`);

const text = 'Hello';

const encrypted = key.encrypt(text);

console.log(encrypted);

try {
    console.log(key.decryptPublic(encrypted));
} catch (err) {
    console.error(err);
}

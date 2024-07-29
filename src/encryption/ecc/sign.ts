import { createSign, generateKeyPairSync, verify } from 'node:crypto';

const passphrase = 'top secret';
const { publicKey, privateKey } = generateKeyPairSync('ec', {
  namedCurve: 'secp521r1',
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase,
  },
});
const data = 'foo';
const sign = createSign('sha512');
const signed = sign
  .update(data)
  .sign({ key: privateKey, passphrase })
  .toString('base64');

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(signed);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  verify('sha512', Buffer.from(data), publicKey, Buffer.from(signed, 'base64'))
);

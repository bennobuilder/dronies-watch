import { AES, enc, lib } from 'crypto-js';
import config from '../../../config';

export function encrypt(token: string, secret: string): string {
  return AES.encrypt(token, secret).toString();
}

export function decrypt(encrypted: string, secret: string): string {
  return AES.decrypt(encrypted, secret).toString(enc.Utf8);
}

export function getEncryptedJsonPayload(value: { [key: string]: any }) {
  value._salt = lib.WordArray.random(128 / 8);

  const encryptedData = encrypt(
    JSON.stringify(value),
    config.api.jsonPayloadSecret,
  );

  return {
    encrypted: true,
    data: encryptedData,
  };
}

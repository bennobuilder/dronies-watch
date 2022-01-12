import { AES, enc } from 'crypto-js';

export function encrypt(token: string, secret: string): string {
  return AES.encrypt(token, secret).toString();
}

export function decrypt(encrypted: string, secret: string): string {
  return AES.decrypt(encrypted, secret).toString(enc.Utf8);
}

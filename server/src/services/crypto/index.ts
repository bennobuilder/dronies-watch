import { AES, enc } from 'crypto-js';
import config from '../../config';

export function encrypt(token: string): string {
  return AES.encrypt(token, config.orm.secret!).toString();
}

export function decrypt(encrypted: string): string {
  return AES.decrypt(encrypted, config.orm.secret!).toString(enc.Utf8);
}

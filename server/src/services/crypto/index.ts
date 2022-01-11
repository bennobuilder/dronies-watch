import { AES, enc } from 'crypto-js';

export function encrypt(token: string, secret: string): string {
  return AES.encrypt(token, secret).toString();
}

export function decrypt(encrypted: string, secret: string): string {
  return AES.decrypt(encrypted, secret).toString(enc.Utf8);
}

/*
accuracy: 95
avatarUrl: "https://avatars.githubusercontent.com/u/65738859?v=4"
cpm: 406
time: "2022-01-10T15:21:36.306Z"
username: "mizoxes"

avatarUrl: "https://avatars.githubusercontent.com/u/57860196?v=4"
guest: false
id: "5ff9f6cc47a6460021412deb"
username: "bennodev19"
 */

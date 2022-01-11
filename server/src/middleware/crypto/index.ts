import { NextFunction, Request, Response } from 'express';
import { decrypt } from '../../services/crypto';
import config from '../../config';

export async function cryptoJsonMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const contentType = req.get('Content-Type');
    if (contentType?.includes('application/json')) {
      const { encrypted: isEncrypted, data: encryptedData } = req.body;

      if (encryptedData != null && isEncrypted) {
        console.log({
          key: config.app.jsonPayloadSecret,
          encryptedData,
          decrypted: decrypt(encryptedData, config.app.jsonPayloadSecret),
          test: decrypt(
            'U2FsdGVkX1+1hSXF2WG+vqnAyqXdM6ikUbChWRGoY74=',
            'mYq3t6w9z&E)H@McQfTjWnZr4u7x!A',
          ),
          // mYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A
          // mYq3t6w9z&E)H@McQfTjWnZr4u7x!A
          // mYq3t6w9z&E)H@McQfTjWnZr4u7x!A
          // mYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A
          // mYq3t6w9z&E)H@McQfTjWnZr4u7x!A
        });
        req.body = JSON.parse(
          decrypt(encryptedData, config.app.jsonPayloadSecret),
        );
      }
    }
  } catch (err) {
    console.log('Decryption failed', err);
  }
  return next();
}

import { NextFunction, Request, Response } from 'express';
import { decrypt } from '../../services/crypto';
import config from '../../config';

// Yes, this is NOT very secure!
// But at least a amateur "score" cheater has to invest a little bit of time to fake his score ;D
export async function cryptoJsonMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const contentType = req.get('Content-Type');
    if (contentType?.includes('application/json')) {
      const { encrypted: isEncrypted, data: encryptedData } = req.body;

      // Decrypt request body
      if (encryptedData != null && isEncrypted) {
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

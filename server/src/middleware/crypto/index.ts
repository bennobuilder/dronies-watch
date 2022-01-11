import { NextFunction, Request, Response } from 'express';
import { decrypt } from '../../services/crypto';
import config from '../../config';

// Yes, This isn't secure!
// But at least a 'score' cheater needs to invest a bit of time to fake a score request ;D
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

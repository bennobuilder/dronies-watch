import { getRepository } from 'typeorm';
import { User } from '../../../db/entities/User';
import { decrypt } from '../../../crypto';
import { getDiscordUserDetails } from '../auth/auth.service';

const userRepository = getRepository(User);

export async function getUser(userId: string): Promise<User | null> {
  const userInDB = await userRepository.findOne({
    id: parseInt(userId),
  });
  if (userInDB == null) return null;

  // Decrypt user credentials
  userInDB.accessToken = decrypt(userInDB.accessToken);
  userInDB.refreshToken = decrypt(userInDB.refreshToken);

  // TODO Check for user profile updates
  getDiscordUserDetails(userInDB.accessToken);

  return userInDB;
}

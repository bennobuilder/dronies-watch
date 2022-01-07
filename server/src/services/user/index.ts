import {
  CreateUserParams,
  UpdateUserParams,
  UserCredentials,
} from '../../routes/v1/auth/auth.types';
import { getRepository } from 'typeorm';
import { User } from '../../db/entities/User';
import { decrypt } from '../crypto';
import { getDiscordUserDetails } from './discord';

const userRepository = getRepository(User);

export async function createUser(
  params: CreateUserParams,
  credentials: UserCredentials,
): Promise<User> {
  // Check if user already exists and update him if necessary
  const userInDB = await userRepository.findOne({
    discordId: params.discordId,
  });
  if (userInDB != null) {
    return await updateUser(userInDB, params, credentials);
  }

  // Create new user
  const newUser = userRepository.create({ ...params, ...credentials });
  const savedUser = await userRepository.save(newUser);
  return savedUser[0];
}

export async function updateUser(
  user: User,
  updatedParams: UpdateUserParams,
  credentials: UserCredentials,
) {
  user.name = updatedParams.name;
  user.discriminator = updatedParams.discriminator;
  user.avatar = updatedParams.avatar;
  user.accessToken = credentials.accessToken;
  user.refreshToken = credentials.refreshToken;

  return userRepository.save(user);
}

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

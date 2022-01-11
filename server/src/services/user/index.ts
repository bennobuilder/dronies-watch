import { getRepository } from 'typeorm';
import { User } from '../../db';
import { decrypt } from '../crypto';
import {
  CreateUserParams,
  UpdateUserParams,
  UserCredentials,
} from './user.types';
import { deleteSession } from '../session';
import config from '../../config';

const userRepository = getRepository(User);

export async function createUser(
  params: CreateUserParams,
  credentials: UserCredentials,
): Promise<User> {
  // Check if user already exists and update him if necessary
  const userInDB = await userRepository.findOne({
    discordId: params.discordId,
  });
  if (userInDB != null) return updateUser(userInDB, params, credentials);

  // Create and save new user
  const newUser = userRepository.create({ ...params, ...credentials });
  return userRepository.save(newUser);
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
  userInDB.accessToken = decrypt(userInDB.accessToken, config.orm.secret!);
  userInDB.refreshToken = decrypt(userInDB.refreshToken, config.orm.secret!);

  // TODO Check for user profile updates
  // await getDiscordUserDetails(userInDB.accessToken);

  return userInDB;
}

export async function deleteUser(userId: string) {
  await userRepository.delete(userId);
  await deleteSession(userId);
}

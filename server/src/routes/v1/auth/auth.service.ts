import axios from 'axios';
import config from '../../../config';
import {
  CreateUserParams,
  DiscordOAuth2CredentialsResponse,
  DiscordOAuth2UserResponse,
  OAuth2TokenExchangeRequestParams,
  UpdateUserParams,
  UserCredentials,
} from './auth.types';
import { urlEncodeData } from '../../../utils/urlEncodeData';
import { getRepository } from 'typeorm';
import { User } from '../../../db/entities/User';
import { getUser } from '../user/user.service';

const userRepository = getRepository(User);

// Retrieve access and refresh token
export async function exchangeAccessCodeForCredentials(
  data: OAuth2TokenExchangeRequestParams,
) {
  return await axios.post<DiscordOAuth2CredentialsResponse>(
    config.discord.routes.oauth2Token,
    // https://axios-http.com/docs/urlencoded
    urlEncodeData(data),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

// Retrieve Discord user data
export async function getDiscordUserDetails(
  accessToken: string,
  tokenType = 'Bearer', // tokenType = 'Bearer' (https://www.devopsschool.com/blog/what-is-bearer-token-and-how-it-works/)
) {
  return await axios.get<DiscordOAuth2UserResponse>(
    config.discord.routes.oauth2User,
    {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    },
  );
}

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

export async function revokeToken(userId: string): Promise<boolean> {
  const user = await getUser(userId);
  if (user == null) return false;

  // TODO delete user and session

  await axios.post(
    config.discord.routes.revokeToken,
    // https://axios-http.com/docs/urlencoded
    urlEncodeData({
      client_id: config.discord.applicationId!,
      client_secret: config.discord.clientSecret!,
      token: user.accessToken,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return true;
}

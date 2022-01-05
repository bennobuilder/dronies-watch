import axios from 'axios';
import config from '../../../config';
import {
  CreateUserParams,
  DiscordOAuth2CredentialsResponse,
  DiscordOAuth2UserResponse,
  OAuth2TokenExchangeRequestParams,
  UpdateUserParams,
} from './auth.types';
import { urlEncodeData } from '../../../utils/urlEncodeData';
import { getRepository } from 'typeorm';
import { User } from '../../../db/entities/User';

const userRepository = getRepository(User);

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

export async function createUser(params: CreateUserParams): Promise<User> {
  // Check if user exists and update it if necessary
  const userInDB = await userRepository.findOne({
    discordId: params.discordId,
  });
  if (userInDB != null) {
    return await updateUser(userInDB, params);
  }

  // Create new user
  const newUser = userRepository.create(params);
  const savedUser = await userRepository.save(newUser);
  return savedUser[0];
}

export async function updateUser(user: User, params: UpdateUserParams) {
  user.name = params.name;
  user.discriminator = params.discriminator;
  user.avatar = params.avatar;

  return userRepository.save(user);
}

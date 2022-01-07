import axios from 'axios';
import config from '../../../config';
import { DiscordOAuth2UserResponse } from './discord.types';

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

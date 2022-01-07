// Retrieve Discord user data
import axios from 'axios';
import { DiscordOAuth2UserResponse } from '../../../routes/v1/auth/auth.types';
import config from '../../../config';

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

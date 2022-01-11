import axios from 'axios';
import { GetCurrentUserResponse, RevokeAuthResponse, User } from './user.types';
import config from '../../../config';

export const FETCH_AUTHENTICATED_USER = async (): Promise<User> => {
  const response = await axios.get<GetCurrentUserResponse>(
    config.api.routes.currentUser,
    {
      withCredentials: true,
    },
  );
  return response.data.user;
};

export const REVOKE_AUTH = async (): Promise<boolean> => {
  const response = await axios.get<RevokeAuthResponse>(
    `${config.api.baseUrl}/auth/discord/revoke`,
    {
      withCredentials: true,
    },
  );
  return response.data.success;
};

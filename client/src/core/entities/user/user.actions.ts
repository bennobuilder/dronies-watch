import axios from 'axios';
import { User } from './user.types';
import config from '../../../config';
import { CURRENT_USER, USERS } from './user.controller';

export const fetchUsers = (ids: string[]) => {
  // TODO
};

export const fetchAuthenticatedUser = async () => {
  // Fetch authenticated User
  const response = await axios.get<User>(config.api.routes.currentUser, {
    withCredentials: true,
  });
  const user = response.data;

  USERS.collect(user);
  CURRENT_USER.select(user.id);
};

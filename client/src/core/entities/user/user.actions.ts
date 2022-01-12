import { CURRENT_USER, USERS } from './user.controller';
import { FETCH_AUTHENTICATED_USER, REVOKE_AUTH } from './user.api';

export const fetchAuthenticatedUser = async () => {
  const user = await FETCH_AUTHENTICATED_USER();
  USERS.collect(user);
  CURRENT_USER.select(user.id);
};

export const revokeAuth = async () => {
  const success = await REVOKE_AUTH();

  // Remove User from global store
  if (success) {
    CURRENT_USER.select(null);
  }

  return success;
};

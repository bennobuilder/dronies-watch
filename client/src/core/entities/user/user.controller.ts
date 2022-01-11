import { createCollection } from '@agile-ts/core';
import { User } from './user.types';

export const USERS = createCollection<User>();
export const CURRENT_USER = USERS.createSelector('currentUser', null);

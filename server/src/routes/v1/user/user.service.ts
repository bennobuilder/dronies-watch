import { getRepository } from 'typeorm';
import { User } from '../../../db/entities/User';

const userRepository = getRepository(User);

export async function getUser(userId: string): Promise<User | null> {
  const userInDB = await userRepository.findOne({
    id: parseInt(userId),
  });

  return userInDB || null;
}

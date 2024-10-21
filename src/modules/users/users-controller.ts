import { UnifiedArgs, UserData } from '../../types';
import * as usersRepository from './users-repository';

export const getUsers = async () => {
  const users = await usersRepository.getAllUsers();
  return { data: users };
};

export const getUser = async ({ entityId }: UnifiedArgs) => {
  const user = await usersRepository.getUser(entityId!);
  return { data: user };
};

export const createNewUser = async ({ body }: UnifiedArgs) => {
  const user = await usersRepository.createUser(body as UserData);
  return { data: user };
};

export const updateUser = async ({ body, entityId }: UnifiedArgs) => {
  const updatedUser = await usersRepository.updateUser(
    body as UserData,
    entityId!
  );
  return { data: updatedUser };
};

export const deleteUser = async ({ entityId }: UnifiedArgs) => {
  const deletedUserId = await usersRepository.deleteUser(entityId!);
  return { data: { deletedUserId } };
};

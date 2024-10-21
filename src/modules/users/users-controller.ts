import AppError from '../../errors/app-error';
import { HTTPStatusCode, UnifiedArgs, UserData } from '../../types';
import * as usersRepository from './users-repository';

export const getUsers = async () => {
  const users = await usersRepository.getAllUsers();
  return { data: users };
};

export const getUser = async ({ entityId }: UnifiedArgs) => {
  try {
    const user = await usersRepository.getUser(entityId!);
    return { data: user };
  } catch {
    throw new AppError(HTTPStatusCode.BAD_REQUEST, 'Failed to get user');
  }
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
  if (!updatedUser)
    throw new AppError(
      HTTPStatusCode.BAD_REQUEST,
      `Failed to update a user with id ${entityId}`
    );
  return { data: updatedUser };
};

export const deleteUser = async ({ entityId }: UnifiedArgs) => {
  const deletedUserId = await usersRepository.deleteUser(entityId!);
  if (!deletedUserId)
    throw new AppError(
      HTTPStatusCode.BAD_REQUEST,
      `Failed to delete a user with id ${entityId}`
    );
  return { data: { deletedUserId } };
};

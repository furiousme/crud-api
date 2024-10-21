import * as usersRepository from './users-repository';

export const getUsers = async () => {
  const users = await usersRepository.getAllUsers();
  return { data: users };
};

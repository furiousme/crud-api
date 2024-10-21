import { User, UserData } from '../../types';
import { v4 as uuidv4 } from 'uuid';
const users: User[] = [
  {
    id: '1',
    username: 'John Doe',
    age: 18,
    hobbies: ['swimming'],
  },
];

export const getAllUsers = async () => {
  return users;
};

export const getUser = async (userId: string) => {
  return users.find((el) => el.id === userId);
};

export const createUser = async (userData: UserData) => {
  const newUser = {
    id: uuidv4(),
    ...userData,
  };

  users.push(newUser);
  return getUser(newUser.id);
};

export const updateUser = async (userData: UserData, userId: string) => {
  const userIndex = users.findIndex((el) => el.id === userId);
  users.splice(userIndex, 1, { id: userId, ...userData });
  return getUser(userId);
};

export const deleteUser = async (userId: string) => {
  return new Promise((resolve, reject) => {
    const ind = users.findIndex((el) => el.id === userId);

    if (ind !== -1) {
      const removedRecordId = users.splice(ind, 1)[0].id;
      resolve(removedRecordId);
    } else {
      reject();
    }
  });
};

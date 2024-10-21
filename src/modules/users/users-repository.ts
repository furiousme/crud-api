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
  return new Promise((resolve) => {
    resolve(users);
  });
};

export const getUser = async (userId: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find((el) => el.id === userId);

    if (user) {
      resolve(user);
    } else {
      reject();
    }
  });
};

export const createUser = async (userData: UserData) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...userData };
    users.push(newUser);

    getUser(newUser.id)
      .then((updatedUser) => resolve(updatedUser))
      .catch((e) => reject(e));
  });
};

export const updateUser = async (userData: UserData, userId: string) => {
  return new Promise((resolve, reject) => {
    const userIndex = users.findIndex((el) => el.id === userId);
    users.splice(userIndex, 1, { id: userId, ...userData });
    getUser(userId)
      .then((updatedUser) => resolve(updatedUser))
      .catch((e) => reject(e));
  });
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

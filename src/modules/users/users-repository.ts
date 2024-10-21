import { User } from '../../types';

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

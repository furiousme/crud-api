import * as usersController from './modules/users/users-controller';

export const router = {
  users: {
    GET: usersController.getUsers,
    // POST: 'createUser',
    // PUT: 'updateUser',
    // DELETE: 'deleteUser',
  },
};

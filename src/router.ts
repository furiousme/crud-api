import * as usersController from './modules/users/users-controller';
import { UnifiedArgs } from './types';

export const router = {
  users: {
    GET: (args: UnifiedArgs) => {
      return args.entityId ? usersController.getUser : usersController.getUsers;
    },
    POST: () => {
      return usersController.createNewUser;
    },
    PUT: () => {
      return usersController.updateUser;
    },
    DELETE: () => {
      return usersController.deleteUser;
    },
  },
};

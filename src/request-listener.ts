import { IncomingMessage, ServerResponse } from 'http';
import AppError from './errors/app-error';
import processError from './errors/process-error';
import UsersService from './services/users-service';
import { HTTPMethod, HTTPStatusCode } from './types';
import { logger } from './logger';
import { sendResponse } from './utils';

const usersService = new UsersService();

const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;
  const baseURL = `http://${req.headers.host}/`;
  const { pathname } = new URL(url || '', baseURL);
  const splittedPath = pathname.split('/');
  const [apiPath, model, modelId] = splittedPath.filter((el) => el);

  res.setHeader('Content-Type', 'application/json');
  logger.info(`${method} ${pathname}`);

  if (!method || apiPath !== 'api' || model !== 'users') {
    const payload = { success: false, message: 'This endpoint does not exist' };
    sendResponse({ res, code: HTTPStatusCode.NOT_FOUND, payload });
  }

  try {
    if (typeof modelId === 'undefined') {
      // path looks like '/users'
      switch (method) {
        case HTTPMethod.GET: {
          const users = await usersService.getAllUsers();
          const payload = { success: true, data: users };
          sendResponse({ res, code: HTTPStatusCode.OK, payload });

          // console.log('check if it executed');
          break;
        }

        case HTTPMethod.POST: {
          let body = '';
          req.on('data', (chunk) => (body += chunk.toString()));
          req.on('end', async () => {
            try {
              const input = JSON.parse(body);
              const user = UsersService.validate(input);
              const record = await usersService.create(user);
              const payload = { success: true, data: record };
              sendResponse({ res, code: HTTPStatusCode.CREATED, payload });
            } catch (e) {
              processError(e, res);
            }
          });
          break;
        }

        default: {
          throw new AppError(HTTPStatusCode.BAD_REQUEST, 'This method is not allowed');
        }
      }
    } else {
      // path looks like '/users/12345
      switch (method) {
        case HTTPMethod.GET: {
          const user = await usersService.getUserById(modelId);
          const payload = { success: true, data: user };
          sendResponse({ res, code: HTTPStatusCode.OK, payload });
          break;
        }

        case HTTPMethod.PUT: {
          let body = '';

          req.on('data', (chunk) => (body += chunk.toString()));
          req.on('end', async () => {
            try {
              const input = JSON.parse(body);
              const user = UsersService.validate(input);
              const record = await usersService.update(modelId, user);
              const payload = { success: true, data: record };
              sendResponse({ res, code: HTTPStatusCode.OK, payload });
            } catch (e) {
              processError(e, res);
            }
          });
          break;
        }

        case HTTPMethod.DELETE: {
          await usersService.remove(modelId);
          const payload = { success: true };
          sendResponse({ res, code: HTTPStatusCode.NO_CONTENT, payload });
          break;
        }

        default: {
          throw new AppError(HTTPStatusCode.BAD_REQUEST, 'This method is not allowed');
        }
      }
    }
  } catch (e) {
    processError(e, res);
  }
};

export default requestListener;

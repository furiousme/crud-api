import { ServerResponse } from 'http';
import { HTTPStatusCode } from '../types';
import AppError from './app-error';
import { sendResponse } from '../utils';

const processError = (e: unknown, res: ServerResponse) => {
  if (e instanceof AppError) {
    const payload = { success: false, message: e.friendlyMessage };
    sendResponse({ res, code: e.code, payload });
    return;
  }

  const payload = { success: false, message: 'Error processing request' };
  sendResponse({ res, code: HTTPStatusCode.INTERNAL_SERVER, payload });
};

export default processError;

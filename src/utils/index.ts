import { ResponseData } from '../types';
import { logger } from '../logger';

export const sendResponse = ({ res, code, payload }: ResponseData) => {
  if (payload?.message) {
    const loggerHandler = payload?.success ? logger.info : logger.error;
    loggerHandler(payload.message);
  }

  res.writeHead(code);
  res.end(JSON.stringify(payload));
};

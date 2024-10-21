import { ServerResponse } from 'node:http';
import { HTTPStatusCode } from '../types';

export const sendNotFound = (res: ServerResponse) => {
  res.statusCode = HTTPStatusCode.NOT_FOUND;
  res.end('Not found');
};

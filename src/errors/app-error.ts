import { HTTPStatusCode } from '../types';

class AppError extends Error {
  code: HTTPStatusCode;
  message: string;

  constructor(code: HTTPStatusCode, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}

export default AppError;

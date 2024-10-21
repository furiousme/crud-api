export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type UnifiedHandlerResult = {
  data: unknown;
  statusCode?: number;
  headers?: Record<string, string>;
};

export enum HTTPStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

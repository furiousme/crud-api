import { ServerResponse } from 'node:http';

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

export type UnifiedArgs = {
  entityName: string;
  entityId?: string;
  body?: unknown;
};

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum HTTPStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export interface ResponseData {
  res: ServerResponse;
  code: HTTPStatusCode;
  payload?: {
    message?: string;
    data?: unknown;
    success: boolean;
  };
}

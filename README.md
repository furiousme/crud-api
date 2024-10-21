# CRUD API

## Description

This project implements a simple CRUD API using an in-memory database. The API provides basic functionality to create, read, update, and delete user data. It also supports horizontal scaling with the use of the Node.js Cluster API.

## Endpoints

### 1. GET `/api/users`

- Returns a list of all users.
- **Response:** 200 OK

### 2. GET `/api/users/{userId}`

- Returns the user with the specified `userId`.
- **Response:**
  - 200 OK if the user is found
  - 400 Bad Request if `userId` is not a valid UUID
  - 404 Not Found if the user does not exist

### 3. POST `/api/users`

- Creates a new user with `username`, `age`, and `hobbies`.
- **Response:**
  - 201 Created with the new user object
  - 400 Bad Request if required fields are missing

### 4. PUT `/api/users/{userId}`

- Updates the user with the specified `userId`.
- **Response:**
  - 200 OK with the updated user object
  - 400 Bad Request if `userId` is invalid
  - 404 Not Found if the user does not exist

### 5. DELETE `/api/users/{userId}`

- Deletes the user with the specified `userId`.
- **Response:**
  - 204 No Content if deleted successfully
  - 400 Bad Request if `userId` is invalid
  - 404 Not Found if the user does not exist

### Error Handling

- Requests to non-existing endpoints will return **404 Not Found** with a human-friendly message.
- Server errors are handled with a **500 Internal Server Error** response.

## Features

### Horizontal Scaling

- Supports horizontal scaling using the Node.js Cluster API.
- Run multiple instances using the `start:multi` script.
- A load balancer distributes requests across multiple worker instances using the Round-robin algorithm.
- Consistent state across different workers.

### Environment Variables

- Environment variables should be stored in the `.env.development` (`.env.production`) file.

### Development and Production Modes

- **Development mode:** Run the app with `npm run start:dev`.
- **Production mode:** Build the app and run the bundled file with `npm run start:prod`.

## Scripts

- **`npm run start:multi`**: Starts multiple instances of the app with a load balancer for horizontal scaling.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up your `.env.development` (`.env.production`) file with the necessary configuration.
4. Run the application in development mode: `npm run start:dev` or in production mode: `npm run start:prod`.

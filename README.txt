### This project utilizes JavaScript and Node.js for its implementation.

## Task Management App.
This is a backend project for managing tasks and user authentication.



## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Introduction
This backend project provides an API for managing tasks and user authentication. 
It includes features such as user registration, verification, login, password-change, forgot-password, reset-password, task creation, updating, deletion, and fetching.

## Features
- User authentication (registration, verification, login, logout, password-change, forgot-password, reset-password)
- Task management (CRUD operations)
- Input data validation
- Error handling
- Middleware for authentication
- Response Handler and ResponseCode Handler.
- RESTful API endpoints

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- Error handling middleware

## Setup
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables in an `.env` file (see example for reference).
  [
    #.env should be created with the following variables 
    MONGO_URI = 
    JWT_SECRET=Incorrect.23
    EMAIL_HOST = smtp.gmail.com
    EMAIL_USER= 
    EMAIL_PASS= 
    FRONTENDURL="" #THIS SHOULD BE THE FRONTEND URL SO THAT LINKS CAN BE DYNAMICALY CREATED WHEN NEEDED FOR REGISTRATION, VERIFICATION, PASSWORD RESET AND THE REST
    BACKENDURL=http://localhost:6000/api/
  ]
4. Start the server using `npx nodemon`.
5. Test environment used is Postman. See Postman documentation URL here - https://documenter.getpostman.com/view/28967699/2sA3JT2xqu
    [Other Backend tools and platforms like, Insomnia and Swagger UI can be used for tests.]
6. The live hosting environment utilized is Render. You can find the Render hosted-site URL here: - https://niyo-task-manager.onrender.com/

## Usage
1. Register a new user using the `/api/users/register` endpoint.
2. Log in using the `/api/users/login` endpoint to obtain a JWT token.
3. Use the obtained token for accessing protected routes.
4. Perform CRUD operations on tasks using the appropriate endpoints.

## API Endpoints
- `POST /api/users/register` - Register a new user.
- `GET /api/users/verify/:id` - Verify registered user with ID.
- `POST /api/users/login` - Login an existing user and get a JWT token.
- `POST /api/users/logout` - Logout an existing user.
- `PATCH /api/users/changepassword` - User can change password while in the App.
- `POST /api/users/forgotpassword` - Incase user cannot remember password to login, user can start new password creation through this endpoint.
- `PUT /api/users/resetpassword` - Complete the process of creating a new password with a JWT token generated from the forgotpassword endpoint.

- `PUT /api/tasks/createtask` - Create a new task.
- `GET /api/tasks/getalltasks` - Get all tasks.
- `GET /api/tasks/getsingletask` - Get a single task by query method.
- `PATCH /api/tasks/updatesingletask` - Update a task by query method.
- `DELETE /api/tasks/deletesingletask` - Delete a task.
- `DELETE /api/tasks/deletealltasks` - Delete all tasks by query method.
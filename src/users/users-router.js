const express = require('express');
const path = require('path');
const UsersService = require('./users-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.route('/').get((req, res, next) => {
  UsersService.getAllUsers(req.app.get('db'))
    .then(users => {
      res.json(users);
    })
    .catch(next);
});

module.exports = usersRouter;


/* All of the GET routes are working as intended. Today I must 
continue working on the backend. All tests are passing for the GET,
POST, DELETE, and UPDATE endpoints, but I have yet to implement them
into the 'strong-at-every-size' database.  
      * Work on other endpoints to get working on the main db 
      * Once I get those working, confirm with Charles or a TA 
           that my data structure is correct. 
      * Once those two things are working properly, I can move to
            connect the backend to the frontend.
      * Then once I get everything I want rendering from the backend
            to the frontend, I will then work on authentication.*/
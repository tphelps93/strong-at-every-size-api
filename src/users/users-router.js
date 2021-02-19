const express = require('express');
const logger = require('../logger');
const path = require('path');
const UsersService = require('./users-service');
const multer = require('multer');
const { requireAuth } = require('../middleware/jwt-auth');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('File must be "jpeg" or "png"'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const serializeUser = user => ({
  user_id: user.user_id,
  photo: user.photo,
  name: user.name,
  user_name: user.user_name,
  password: user.password,
  email: user.email,
  address: user.address,
  state: user.state,
  zip: user.zip,
  isadmin: user.isadmin,
});

usersRouter
  .route('/')
  .get(jsonBodyParser, (req, res, next) => {
    UsersService.getAllUsers(req.app.get('db'))
      .then(users => {
        res.json(users.map(serializeUser));
      })
      .catch(next);
  })
  .post(jsonBodyParser, upload.single('photo'), (req, res, next) => {
    const { name, user_name, password, email, address, state, zip } = req.body;
    for (const field of [
      'name',
      'user_name',
      'password',
      'email',
      'address',
      'state',
      'zip',
    ]) {
      if (!req.body[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required` },
        });
      }
    }

    const passwordError = UsersService.validatePassword(password);

    if (passwordError) return res.status(400).json({ error: passwordError });

    UsersService.hasUserWithUserName(req.app.get('db'), user_name)
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` });

        return UsersService.hashedPassword(password).then(hashedPassword => {
          const newUser = {
            name,
            user_name,
            password: hashedPassword,
            email,
            address,
            state,
            zip,
          };

          return UsersService.insertUser(req.app.get('db'), newUser).then(
            user => {
              res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${user.user_id}`))
                .json(serializeUser(user));
            }
          );
        });
      })
      .catch(next);
  });

usersRouter
  .route('/:user_id')
  .all((req, res, next) => {
    const { user_id } = req.params;

    UsersService.getById(req.app.get('db'), user_id)
      .then(user => {
        if (!user) {
          logger.error(`User with id ${user_id} not found.`);
          return res.status(404).json({
            error: { message: `User Not Found` },
          });
        }
        res.user = user;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializeUser(res.user));
  })

  .delete((req, res, next) => {
    const { user_id } = req.params;
    UsersService.deleteUser(req.app.get('db'), user_id)
      .then(numRowsAffected => {
        logger.info(`User with id ${user_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(jsonBodyParser, upload.single('photo'), (req, res, next) => {
    const {
      name,
      user_name,
      email,
      address,
      state,
      zip,
      isadmin,
    } = req.body;

    const userToUpdate = {
      photo: req.file.filename,
      name,
      user_name,
      email,
      address,
      state,
      zip,
      isadmin,
    };

    const numOfValues = Object.values(userToUpdate).filter(Boolean).length;

    UsersService.getById(req.app.get('db'), req.params.user_id).then(user => {
      if (user.isadmin === false) {
        isadmin === false;
      }

      if (numOfValues === 0) {
        logger.error('Invalid update without required fields');
        return res.status(400).json({
          error: {
            message:
              'Request body must contain either "photo", "name", "user_name", "email", "address", "state", "zip", isadmin',
          },
        });
      }

      UsersService.updateUser(
        req.app.get('db'),
        req.params.user_id,
        userToUpdate
      )
        .then(updatedUser => {
          res.status(200).json(serializeUser(updatedUser));
        })
        .catch(next);
    });
  });

module.exports = usersRouter;

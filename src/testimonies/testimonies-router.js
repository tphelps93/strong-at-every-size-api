const express = require('express');
const logger = require('../logger');
const path = require('path');
const TestimoniesService = require('./testimonies-service');
const multer = require('multer');
const { requireAuth } = require('../middleware/jwt-auth');

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

const testimoniesRouter = express.Router();
const jsonBodyParser = express.json();

const serializeTestimony = testimony => ({
  testimony_id: testimony.testimony_id,
  photo: testimony.photo,
  content: testimony.content,
  date_created: testimony.date_created,
});

testimoniesRouter
  .route('/')
  .get((req, res, next) => {
    TestimoniesService.getAllTestimonies(req.app.get('db'))
      .then(testimonies => {
        res.json(testimonies.map(serializeTestimony));
      })
      .catch(next);
  })
  .post(
    requireAuth,
    jsonBodyParser,
    upload.single('photo'),
    (req, res, next) => {
      const { content } = req.body;
      upload.single('photo')(req, res, function (error) {
        if (error) {
          console.log(`upload.single error: ${error}`);
        }
      });
      const newTestimony = {
        photo: req.file.filename,
        content,
      };

      for (const field of ['photo', 'content']) {
        if (!newTestimony[field]) {
          logger.error(`${field} is required`);
          return res.status(400).send({
            error: { message: `'${field}' is required` },
          });
        }
      }
      return TestimoniesService.insertTestimony(req.app.get('db'), newTestimony)
        .then(testimony => {
          logger.info(`Testimony with id ${testimony.testimony_id} created.`);
          res
            .status(201)
            .location(
              path.posix.join(req.originalUrl, `/${testimony.testimony_id}`)
            )
            .json(testimony);
        })
        .catch(next);
    }
  );

testimoniesRouter
  .route('/:testimony_id')
  .all((req, res, next) => {
    const { testimony_id } = req.params;

    TestimoniesService.getById(req.app.get('db'), testimony_id)
      .then(testimony => {
        if (!testimony) {
          logger.error(`Testimony with id ${testimony_id} not found.`);
          return res.status(404).json({
            error: { message: `Testimony Not Found` },
          });
        }
        res.testimony = testimony;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializeTestimony(res.testimony));
  })

  .delete(requireAuth, (req, res, next) => {
    const { testimony_id } = req.params;
    TestimoniesService.deleteTestimony(req.app.get('db'), testimony_id)
      .then(numRowsAffected => {
        logger.info(`Testimony with id ${testimony_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(requireAuth, jsonBodyParser, (req, res, next) => {
    const { content } = req.body;

    const testimonyToUpdate = { photo: req.file.filename, content };

    const numOfValues = Object.values(testimonyToUpdate).filter(Boolean).length;

    if (numOfValues === 0) {
      logger.error('Invalid update without required fields');
      return res.status(400).json({
        error: {
          message: 'Request body must contain either "photo", "content"',
        },
      });
    }

    TestimoniesService.updateTestimony(
      req.app.get('db'),
      req.params.testimony_id,
      testimonyToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = testimoniesRouter;

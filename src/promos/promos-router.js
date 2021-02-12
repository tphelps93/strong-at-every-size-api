const express = require('express');
const path = require('path');
const logger = require('../logger');
const PromosService = require('./promos-service');
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

const promosRouter = express.Router();
const jsonBodyParser = express.json();

const serializePromo = promo => ({
  promo_id: promo.promo_id,
  photo: promo.photo,
  title: promo.title,
  content: promo.content,
  date_created: promo.date_created,
});

promosRouter
  .route('/')
  .get((req, res, next) => {
    PromosService.getAllPromos(req.app.get('db'))
      .then(promos => {
        res.json(promos.map(serializePromo));
      })
      .catch(next);
  })
  .post(requireAuth, jsonBodyParser, upload.single('photo'), (req, res, next) => {
    const { title, content } = req.body;
    const newPromo = {
      photo: req.file.filename,
      title,
      content,
    };

    for (const field of ['photo', 'title', 'content']) {
      if (!newPromo[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required` },
        });
      }
    }

    return PromosService.insertPromo(req.app.get('db'), newPromo)
      .then(promo => {
        logger.info(`Promo with id ${promo.promo_id}`);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${promo.promo_id}`))
          .json(promo);
      })
      .catch(next);
  });

promosRouter
  .route('/is-admin')
  .all(requireAuth)
  .get((req, res, next) => {
    res.json(req.user.isadmin);
  });

promosRouter
  .route('/:promo_id')
  .all((req, res, next) => {
    const { promo_id } = req.params;

    PromosService.getById(req.app.get('db'), promo_id)
      .then(promo => {
        if (!promo) {
          logger.error(`Promo with id ${promo_id} not found.`);
          return res.status(404).json({
            error: { message: `Promo Not Found` },
          });
        }
        res.promo = promo;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializePromo(res.promo));
  })

  .delete((req, res, next) => {
    const { promo_id } = req.params;
    PromosService.deletePromo(req.app.get('db'), promo_id)
      .then(numRowsAffected => {
        logger.info(`Promo with id ${promo_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(requireAuth, jsonBodyParser, (req, res, next) => {
    const { title, content } = req.body;

    const promoToUpdate = { photo: req.file.filename, title, content };

    const numOfValues = Object.values(promoToUpdate).filter(Boolean).length;

    if (numOfValues === 0) {
      logger.error('Invalid update without required fields');
      return res.status(400).json({
        error: {
          message: 'Request body must contain either "photo", "title" or "content"',
        },
      });
    }

    PromosService.updatePromo(
      req.app.get('db'),
      req.params.promo_id,
      promoToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = promosRouter;

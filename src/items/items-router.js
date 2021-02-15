const express = require('express');
const path = require('path');
const logger = require('../logger');
const ItemsService = require('./items-service');
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

const itemsRouter = express.Router();
const jsonBodyParser = express.json();

const serializeItem = item => ({
  item_id: item.item_id,
  photo: item.photo,
  title: item.title,
  price: item.price,
  category: item.category,
  description: item.description,
  date_created: item.date_created,
});

itemsRouter
  .route('/')
  .get(jsonBodyParser, (req, res, next) => {
    ItemsService.getAllItems(req.app.get('db'))
      .then(items => {
        res.json(items.map(serializeItem));
      })
      .catch(next);
  })
  .post(jsonBodyParser, upload.single('photo'), (req, res, next) => {
    const { title, price, category, description } = req.body;

    const newItem = {
      photo: req.file.filename,
      title,
      price,
      category,
      description,
    };

    for (const field of [
      'photo',
      'title',
      'price',
      'category',
      'description',
    ]) {
      if (!newItem[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required` },
        });
      }
    }
    return ItemsService.insertItem(req.app.get('db'), newItem)
      .then(item => {
        logger.info(`Item with id ${item.item_id} created.`);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${item.item_id}`))
          .json(item);
      })
      .catch(next);
  });

itemsRouter
  .route('/:item_id')
  .all((req, res, next) => {
    const { item_id } = req.params;

    ItemsService.getById(req.app.get('db'), item_id)
      .then(item => {
        if (!item) {
          logger.error(`Item with id ${item_id} not found.`);
          return res.status(404).json({
            error: { message: `Item Not Found` },
          });
        }
        res.item = item;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializeItem(res.item));
  })

  .delete((req, res, next) => {
    const { item_id } = req.params;
    ItemsService.deleteItem(req.app.get('db'), item_id)
      .then(numRowsAffected => {
        logger.info(`Item with id ${item_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(jsonBodyParser, (req, res, next) => {
    const { title, price, category, description } = req.body;

    const itemToUpdate = {
      photo: req.file.filename,
      title,
      price,
      category,
      description,
    };

    const numOfValues = Object.values(itemToUpdate).filter(Boolean).length;

    if (numOfValues === 0) {
      logger.error('Invalid update without required fields');
      return res.status(400).json({
        error: {
          message:
            'Request body must contain either "photo", "title", "price", "category", "description"',
        },
      });
    }

    ItemsService.updateItem(req.app.get('db'), req.params.item_id, itemToUpdate)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = itemsRouter;

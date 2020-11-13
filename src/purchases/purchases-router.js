const express = require('express');
const path = require('path');
const logger = require('../logger');
const PurchasesService = require('./purchases-service');

const purchasesRouter = express.Router();
const jsonBodyParser = express.json();

const serializePurchase = purchase => ({
  purchase_id: purchase.purchase_id,
  title: purchase.title,
  price: purchase.price,
  category: purchase.category,
});

purchasesRouter
  .route('/')
  .get((req, res, next) => {
    PurchasesService.getPurchases(req.app.get('db'))
      .then(purchases => {
        res.json(purchases);
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { title, price, category } = req.body;
    const newPurchase = {
      title,
      price,
      category,
    };

    for (const field of ['title', 'price', 'category']) {
      if (!newPurchase[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required` },
        });
      }
    }
    return PurchasesService.insertPurchase(req.app.get('db'), newPurchase)
      .then(purchase => {
        logger.info(`Purchase with id ${purchase.purchase_id} created.`);
        res
          .status(201)
          .location(
            path.posix.join(req.originalUrl, `/${purchase.purchase_id}`)
          )
          .json(purchase);
      })
      .catch(next);
  });

purchasesRouter
  .route('/:purchase_id')
  .all((req, res, next) => {
    const { purchase_id } = req.params;

    PurchasesService.getById(req.app.get('db'), purchase_id)
      .then(purchase => {
        if (!purchase) {
          logger.error(`Purchase with id ${purchase_id} not found.`);
          return res.status(404).json({
            error: { message: `Purchase Not Found` },
          });
        }
        res.purchase = purchase;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializePurchase(res.purchase));
  })

  .delete((req, res, next) => {
    const { purchase_id } = req.params;
    PurchasesService.deletePurchase(req.app.get('db'), purchase_id)
      .then(numRowsAffected => {
        logger.info(`Purchase with id ${purchase_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(jsonBodyParser, (req, res, next) => {
    const { title, price, category } = req.body;

    const purchaseToUpdate = { title, price, category };

    const numOfValues = Object.values(purchaseToUpdate).filter(Boolean).length;

    if (numOfValues === 0) {
      logger.error('Invalid update without required fields');
      return res.status(400).json({
        error: {
          message:
            'Request body must contain either "photo", "content"',
        },
      });
    }

    PurchasesService.updatePurchase(
      req.app.get('db'),
      req.params.purchase_id,
      purchaseToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = purchasesRouter;

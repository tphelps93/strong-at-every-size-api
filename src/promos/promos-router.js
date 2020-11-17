const express = require('express');
const path = require('path');
const logger = require('../logger');
const PromosService = require('./promos-service');
const { requireAuth } = require('../middleware/jwt-auth');

const promosRouter = express.Router();
const jsonBodyParser = express.json();

const serializePromo = promo => ({
  promo_id: promo.promo_id,
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
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { title, content } = req.body;
    const newPromo = {
      title,
      content,
    };

    for (const field of ['title', 'content']) {
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

  .patch(jsonBodyParser, (req, res, next) => {
    const { title, content } = req.body;

    const promoToUpdate = { title, content };

    const numOfValues = Object.values(promoToUpdate).filter(Boolean).length;

    if (numOfValues === 0) {
      logger.error('Invalid update without required fields');
      return res.status(400).json({
        error: {
          message: 'Request body must contain either "content"',
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

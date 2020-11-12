const express = require('express');
const PromosService = require('./promos-service');

const promosRouter = express.Router();

promosRouter.route('/').get((req, res, next) => {
  PromosService.getAllPromos(req.app.get('db'))
    .then(promos => {
      res.json(promos);
    })
    .catch(next);
});

module.exports = promosRouter;
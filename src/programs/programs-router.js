const express = require('express');
const ProgramsService = require('./programs-service');

const programsRouter = express.Router();

programsRouter.route('/').get((req, res, next) => {
  ProgramsService.getAllPrograms(req.app.get('db'))
    .then(programs => {
      res.json(programs);
    })
    .catch(next);
});

module.exports = programsRouter;
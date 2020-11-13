const express = require('express');
const path = require('path');
const logger = require('../logger');
const ProgramsService = require('./programs-service');

const programsRouter = express.Router();
const jsonBodyParser = express.json();

const serializeProgram = program => ({
  program_id: program.program_id,
  title: program.title,
  price: program.price,
  description: program.description,
  date_created: program.date_created,
});

programsRouter
  .route('/')
  .get((req, res, next) => {
    ProgramsService.getAllPrograms(req.app.get('db'))
      .then(programs => {
        res.json(programs.map(serializeProgram));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { title, price, description, date_created } = req.body;
    const newProgram = {
      title,
      price,
      description,
      date_created,
    };

    for (const field of ['title', 'price', 'description', 'date_created']) {
      if (!newProgram[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required ` },
        });
      }
    }
    return ProgramsService.insertProgram(req.app.get('db'), newProgram)
      .then(program => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${program.program_id}`))
          .json(program);
      })
      .catch(next);
  });

programsRouter
  .route('/:program_id')
  .all((req, res, next) => {
    const { program_id } = req.params;

    ProgramsService.getById(req.app.get('db'), program_id)
      .then(program => {
        if (!program) {
          logger.error(`Program with id ${program_id} not found.`);
          return res.status(404).json({
            error: { message: `Program Not Found` },
          });
        }
        res.program = program;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializeProgram(res.program));
  })

  .delete((req, res, next) => {
    const { program_id } = req.params;
    ProgramsService.deleteProgram(req.app.get('db'), program_id)
      .then(numRowsAffected => {
        logger.info(`Program with id ${program_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(jsonBodyParser, (req, res, next) => {
    const { title, price, description, date_created } = req.body;

    const programToUpdate = { title, price, description, date_created };

    const numOfValues = Object.values(programToUpdate).filter(Boolean).length;

    if (numOfValues === 0) {
      logger.error('Invalid update without required fields');
      return res.status(400).json({
        error: {
          message:
            'Request body must contain either "title", "price", "description", "date_created"',
        },
      });
    }

    ProgramsService.updateProgram(
      req.app.get('db'),
      req.params.program_id,
      programToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = programsRouter;

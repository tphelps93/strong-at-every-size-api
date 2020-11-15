const express = require('express');
const path = require('path');
const logger = require('../logger');
const NewsService = require('./news-service');
const { requireAuth } = require('../middleware/jwt-auth');


const newsRouter = express.Router();
const jsonBodyParser = express.json();

const serializeArticle = article => ({
  news_id: article.news_id,
  content: article.content,
  date_created: article.date_created,
});

newsRouter
  .route('/')
  .get((req, res, next) => {
    NewsService.getAllArticles(req.app.get('db'))
      .then(articles => {
        res.json(articles.map(serializeArticle));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { content } = req.body;
    const newArticle = {
      content,
    };

    for (const field of ['content']) {
      if (!newArticle[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required' ` },
        });
      }
    }
    return NewsService.insertArticle(req.app.get('db'), newArticle)
      .then(article => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${article.news_id}`))
          .json(article);
      })
      .catch(next);
  });

newsRouter
  .route('/:news_id')
  .all((req, res, next) => {
    const { news_id } = req.params;

    NewsService.getById(req.app.get('db'), news_id)
      .then(article => {
        if (!article) {
          logger.error(`Article with id ${news_id} not found.`);
          return res.status(404).json({
            error: { message: `Article Not Found` },
          });
        }
        res.article = article;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializeArticle(res.article));
  })

  .delete((req, res, next) => {
    const { news_id } = req.params;
    NewsService.deleteArticle(req.app.get('db'), news_id)
      .then(numRowsAffected => {
        logger.info(`Article with id ${news_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(jsonBodyParser, (req, res, next) => {
    const { content } = req.body;

    const articleToUpdate = { content };

    const numOfValues = Object.values(articleToUpdate).filter(Boolean).length;

    if (numOfValues === 0) {
      logger.error('Invalid update without required fields');
      return res.status(400).json({
        error: {
          message:
            'Request body must contain either "photo", "content"',
        },
      });
    }

    NewsService.updateArticle(
      req.app.get('db'),
      req.params.news_id,
      articleToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = newsRouter;

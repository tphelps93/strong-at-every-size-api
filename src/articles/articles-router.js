const express = require('express');
const path = require('path');
const logger = require('../logger');
const ArticlesService = require('./articles-service');
const { requireAuth } = require('../middleware/jwt-auth');

const articlesRouter = express.Router();
const jsonBodyParser = express.json();

const serializeArticle = article => ({
  article_id: article.article_id,
  title: article.title,
  content: article.content,
  date_created: article.date_created,
});

articlesRouter
  .route('/')
  .get((req, res, next) => {
    ArticlesService.getAllArticles(req.app.get('db'))
      .then(articles => {
        res.json(articles.map(serializeArticle));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { title, content } = req.body;
    const newArticle = {
      title, 
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
    return ArticlesService.insertArticle(req.app.get('db'), newArticle)
      .then(article => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${article.article_id}`))
          .json(article);
      })
      .catch(next);
  });

articlesRouter
  .route('/:article_id')
  .all((req, res, next) => {
    const { article_id } = req.params;

    ArticlesService.getById(req.app.get('db'), article_id)
      .then(article => {
        if (!article) {
          logger.error(`Article with id ${article_id} not found.`);
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
    const { article_id } = req.params;
    ArticlesService.deleteArticle(req.app.get('db'), article_id)
      .then(numRowsAffected => {
        logger.info(`Article with id ${article_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(jsonBodyParser, (req, res, next) => {
    const { title, photo, content } = req.body;

    const articleToUpdate = { title, photo, content };

    const numOfValues = Object.values(articleToUpdate).filter(Boolean).length;

    if (numOfValues === 0) {
      logger.error('Invalid update without required fields');
      return res.status(400).json({
        error: {
          message:
            'Request body must contain either "title", "photo", "content"',
        },
      });
    }

    ArticlesService.updateArticle(
      req.app.get('db'),
      req.params.article_id,
      articleToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = articlesRouter;

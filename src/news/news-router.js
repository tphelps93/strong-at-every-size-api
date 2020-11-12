const express = require('express');
const NewsService = require('./news-service');

const newsRouter = express.Router();

newsRouter.route('/').get((req, res, next) => {
  NewsService.getAllNews(req.app.get('db'))
    .then(news => {
      res.json(news);
    })
    .catch(next);
});

module.exports = newsRouter;
const express = require('express');
const ReviewsService = require('./reviews-service');

const reviewsRouter = express.Router();

reviewsRouter.route('/').get((req, res, next) => {
  ReviewsService.getAllReviews(req.app.get('db'))
    .then(reviews => {
      res.json(reviews);
    })
    .catch(next);
});

module.exports = reviewsRouter;
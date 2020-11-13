const express = require('express');
const path = require('path');
const logger = require('../logger');
const ReviewsService = require('./reviews-service');

const reviewsRouter = express.Router();
const jsonBodyParser = express.json();

const serializeReview = review => ({
  review_id: review.review_id,
  content: review.content,
  rating: review.rating,
  date_created: review.date_created
});


reviewsRouter
  .route('/')
  .get((req, res, next) => {
    ReviewsService.getAllReviews(req.app.get('db'))
      .then(reviews => {
        res.json(reviews);
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { content, rating } = req.body;
    const newReview = {
      content,
      rating,
    };

    for (const field of ['content', 'rating']) {
      if (!newReview[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required` },
        });
      }
    }
    return ReviewsService.insertReview(req.app.get('db'), newReview)
      .then(review => {
        logger.info(`Review with id ${review.review_id}`);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${review.review_id}`))
          .json(review);
      })
      .catch(next);
  });

reviewsRouter
  .route('/:review_id')
  .all((req, res, next) => {
    const { review_id } = req.params;

    ReviewsService.getById(req.app.get('db'), review_id)
      .then(review => {
        if (!review) {
          logger.error(`Review with id ${review_id} not found.`);
          return res.status(404).json({
            error: { message: `Review Not Found` },
          });
        }
        res.review = review;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializeReview(res.review));
  })

  .delete((req, res, next) => {
    const { review_id } = req.params;
    ReviewsService.deleteReview(req.app.get('db'), review_id)
      .then(numRowsAffected => {
        logger.info(`Review with id ${review_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(jsonBodyParser, (req, res, next) => {
    const { content, rating } = req.body;

    const reviewToUpdate = { content, rating };

    const numOfValues = Object.values(reviewToUpdate).filter(Boolean).length;

    if (numOfValues === 0) {
      logger.error('Invalid update without required fields');
      return res.status(400).json({
        error: {
          message:
            'Request body must contain either "content", "review"',
        },
      });
    }

    ReviewsService.updateReview(
      req.app.get('db'),
      req.params.review_id,
      reviewToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = reviewsRouter;

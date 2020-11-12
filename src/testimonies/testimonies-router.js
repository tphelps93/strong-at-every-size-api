const express = require('express');
const TestimoniesService = require('./testimonies-service');

const testimoniesRouter = express.Router();

testimoniesRouter.route('/').get((req, res, next) => {
  TestimoniesService.getAllTestimonies(req.app.get('db'))
    .then(testimonies => {
      res.json(testimonies);
    })
    .catch(next);
});

module.exports = testimoniesRouter;
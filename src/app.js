require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { NODE_ENV } = require('./config');

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const itemsRouter = require('./items/items-router');
const programsRouter = require('./programs/programs-router');
const articlesRouter = require('./articles/articles-router');
const promosRouter = require('./promos/promos-router');
const testimoniesRouter = require('./testimonies/testimonies-router');
const reviewsRouter = require('./reviews/reviews-router');
const purchasesRouter = require('./purchases/purchases-router');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
<<<<<<< HEAD
=======
// makes uploads publicly available. Find a way to make private, but still be used on the frontend.
app.use(express.static(path.join(__dirname, 'public')));
>>>>>>> feature-branch
app.use(helmet());
app.use(
  cors({
    //  origin: NODE_ENV,
  })
);

app.use('/api/users', usersRouter);
app.use('/api/items', itemsRouter);
app.use('/api/programs', programsRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/promos', promosRouter);
app.use('/api/testimonies', testimoniesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/purchases', purchasesRouter);
app.use('/api/auth', authRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const multer = require('multer');
const AWS = require('aws-sdk');

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

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(
  cors({
    //  origin: NODE_ENV,
  })
);

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads');
  },
});

const upload = multer({ storage }).single('photo');

app.post('/api/upload', upload, (req, res) => {
  let uploadedImage = `${Date.now()}${req.file.originalname}`;

  res.send({uploadedImage});

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: uploadedImage,
    Body: req.file.buffer,
  };

  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send(error);
    }
    res.status(200).send(data);
  });
});

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

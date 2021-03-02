require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const awsRouter = express.Router();
const jsonBodyParser = express.json();

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads');
  },
});

const upload = multer({ storage }).single('photo');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

awsRouter
  .route('/')
  .get(jsonBodyParser, (req, res, next) => {
    const response = s3
      .listObjectsV2({
        Bucket: process.env.AWS_S3_BUCKET,
      })
      .promise();
    response
      .then(uploads => {
        let contents = uploads.Contents;
        res.json(contents);
      })
      .catch(next);
  })
  .post(jsonBodyParser, upload, (req, res, next) => {
    let uploadedImage = `${Date.now()}${req.file.originalname}`;

    res.send({ uploadedImage });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: uploadedImage,
      Body: req.file.buffer,
    };

    return s3
      .upload(params, (error, uploadedImage) => {
        if (error) {
          res.status(500).send(error);
        }
        res.status(200).send(uploadedImage);
      })
      .catch(next);
  });

module.exports = awsRouter;

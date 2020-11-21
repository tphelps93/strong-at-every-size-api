const ReviewsService = require('../src/reviews/reviews-service');
const knex = require('knex');
const { expect } = require('chai');

describe('Reviews service object', function () {
  let db;
  let testReviews = [
    {
      review_id: 1,
      content: 'Review Content',
      rating: 5,
      date_created: new Date(),
      itemid: null,
      programid: null,
      userid: null,
    },
    {
      review_id: 2,
      content: 'Review Content 1',
      rating: 3,
      date_created: new Date(),
      itemid: null,
      programid: null,
      userid: null,
    },
    {
      review_id: 3,
      content: 'Review Content 2',
      rating: 1,
      date_created: new Date(),
      itemid: null,
      programid: null,
      userid: null,
    },
  ];

  before('setup db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
  });

  before('clean db', () =>
    db.raw('TRUNCATE TABLE user_reviews RESTART IDENTITY CASCADE')
  );
  afterEach('clean db', () =>
    db.raw('TRUNCATE TABLE user_reviews RESTART IDENTITY CASCADE')
  );

  after('destroy db connection', () => db.destroy());

  context('Given "user_reviews" has data', () => {
    beforeEach(() => {
      return db.into('user_reviews').insert(testReviews);
    });

    it('getAllReviews() resolves all reviews from "user_reviews" table', () => {
      return ReviewsService.getAllReviews(db).then(actual => {
        expect(actual).to.eql(testReviews);
      });
    });

    it(`getById() resolves a review by id from 'user_reviews' table`, () => {
      const thirdId = 3;
      const thirdTestReview = testReviews[thirdId - 1];
      return ReviewsService.getById(db, thirdId).then(actual => {
        expect(actual).to.eql({
          review_id: thirdId,
          content: thirdTestReview.content,
          rating: thirdTestReview.rating,
          date_created: thirdTestReview.date_created,
          itemid: thirdTestReview.itemid,
          programid: thirdTestReview.programid,
          userid: thirdTestReview.userid,
        });
      });
    });

    it(`deleteReview() removes a review by id from 'user_reviews' table`, () => {
      const reviewId = 3;
      return ReviewsService.deleteReview(db, reviewId)
        .then(() => ReviewsService.getAllReviews(db))
        .then(allReviews => {
          const expected = testReviews.filter(
            review => review.review_id !== reviewId
          );
          expect(allReviews).to.eql(expected);
        });
    });
    it(`updateReview() updates a review from the 'user_reviews' table`, () => {
      const idOfReviewToUpdate = 2;
      const newReviewData = {
        content: 'New Content',
        rating: 5,
        date_created: new Date(),
        itemid: null,
        programid: null,
        userid: null,
      };
      return ReviewsService.updateReview(db, idOfReviewToUpdate, newReviewData)
        .then(() => ReviewsService.getById(db, idOfReviewToUpdate))
        .then(review => {
          expect(review).to.eql({
            review_id: idOfReviewToUpdate,
            ...newReviewData,
          });
        });
    });
  });

  context('Given "user_reviews" has no data', () => {
    it('getAllReviews() resolves an empty array', () => {
      return ReviewsService.getAllReviews(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
    it('insertReview() inserts a new review and resolves the new review with a "review_id"', () => {
      this.retries(3);
      const newReview = {
        content: 'New Inserted Content',
        rating: 5,
        date_created: new Date(),
        itemid: null,
        programid: null,
        userid: null,
      };
      return ReviewsService.insertReview(db, newReview).then(actual => {
        expect(res => {
          expect(res.body.content).to.eql(newReview.content);
          expect(res.body.rating).to.eql(newReview.rating);
          const expected = new Date().toLocaleString();
          const actual = newDate(res.body.date_created).toLocaleString();
          expect(actual).to.eql(expected);
          expect(res.body.itemid).to.eql(newReview.itemid);
          expect(res.body.programid).to.eql(newReview.programid);
          expect(res.body.userid).to.eql(newReview.userid);
        });
      });
    });
  });
});

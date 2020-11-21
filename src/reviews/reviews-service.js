const ReviewsService = {
  getAllReviews(db) {
    return db.select('*').from('user_reviews');
  },
  insertReview(db, newReview) {
    return db
      .insert(newReview)
      .into('user_reviews')
      .returning('*')
      .then(([review]) => review);
  },
  getById(db, review_id) {
    return db.from('user_reviews').select('*').where('review_id', review_id).first();
  },
  deleteReview(db, review_id) {
    return db('user_reviews').where({ review_id }).delete();
  },
  updateReview(db, review_id, newReviewFields) {
    return db('user_reviews').where({ review_id }).update(newReviewFields);
  },
};

module.exports = ReviewsService;

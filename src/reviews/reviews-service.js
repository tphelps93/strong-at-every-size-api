const ReviewsService = {
  getAllReviews(knex) {
    return knex.select('*').from('user_reviews');
  },
};

module.exports = ReviewsService;

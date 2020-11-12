const TestimoniesService = {
  getAllTestimonies(knex) {
    return knex.select('*').from('saes_testimonies');
  },
};

module.exports = TestimoniesService;

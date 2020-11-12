const NewsService = {
  getAllNews(knex) {
    return knex.select('*').from('saes_news');
  },
};

module.exports = NewsService;

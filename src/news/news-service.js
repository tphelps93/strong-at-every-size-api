const NewsService = {
  getAllArticles(knex) {
    return knex.select('*').from('saes_news');
  },
  insertArticle(db, newArticle) {
    return db
      .insert(newArticle)
      .into('saes_news')
      .returning('*')
      .then(([article]) => article);
  },
  getById(db, news_id) {
    return db.from('saes_news').select('*').where('news_id', news_id).first();
  },
  deleteArticle(db, news_id) {
    return db('saes_news').where({ news_id }).delete();
  },
  updateArticle(db, news_id, newArticleFields) {
    return db('saes_news').where({ news_id }).update(newArticleFields);
  },
};

module.exports = NewsService;

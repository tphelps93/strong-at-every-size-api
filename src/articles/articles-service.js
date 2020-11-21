const ArticlesService = {
  getAllArticles(knex) {
    return knex.select('*').from('saes_articles');
  },
  insertArticle(db, newArticle) {
    return db
      .insert(newArticle)
      .into('saes_articles')
      .returning('*')
      .then(([article]) => article);
  },
  getById(db, article_id) {
    return db.from('saes_articles').select('*').where('article_id', article_id).first();
  },
  deleteArticle(db, article_id) {
    return db('saes_articles').where({ article_id }).delete();
  },
  updateArticle(db, article_id, newArticleFields) {
    return db('saes_articles').where({ article_id }).update(newArticleFields);
  },
};

module.exports = ArticlesService;

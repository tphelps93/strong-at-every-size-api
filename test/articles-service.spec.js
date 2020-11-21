const ArticlesService = require('../src/articles/articles-service');
const knex = require('knex');
const { expect } = require('chai');

describe('Articles service object', function () {
  let db;
  let testArticles = [
    {
      article_id: 1,
      title: 'Article',
      content: 'A test article',
      date_created: new Date(),
    },
    {
      article_id: 2,
      title: 'Article 1',
      content: 'A test article',
      date_created: new Date(),
    },
    {
      article_id: 3,
      title: 'Article 2',
      content: 'A test article',
      date_created: new Date(),
    },
  ];

  before('setup db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
  });

  before('clean db', () =>
    db.raw('TRUNCATE TABLE saes_articles RESTART IDENTITY CASCADE')
  );
  afterEach('clean db', () =>
    db.raw('TRUNCATE TABLE saes_articles RESTART IDENTITY CASCADE')
  );

  after('destroy db connection', () => db.destroy());

  context('Given "saes_articles" has data', () => {
    beforeEach(() => {
      return db.into('saes_articles').insert(testArticles);
    });

    it('getAllArticles() resolves all articles from "saes_articles" table', () => {
      return ArticlesService.getAllArticles(db).then(actual => {
        expect(actual).to.eql(testArticles);
      });
    });

    it(`getById() resolves an article by id from 'saes_articles table`, () => {
      const thirdId = 3;
      const thirdTestArticle = testArticles[thirdId - 1];
      return ArticlesService.getById(db, thirdId).then(actual => {
        expect(actual).to.eql({
          article_id: thirdId,
          title: thirdTestArticle.title,
          content: thirdTestArticle.content,
          date_created: thirdTestArticle.date_created,
        });
      });
    });

    it(`deleteArticle() removes an article by id from 'saes_articles' table`, () => {
      const articleId = 3;
      return ArticlesService.deleteArticle(db, articleId)
        .then(() => ArticlesService.getAllArticles(db))
        .then(allArticles => {
          const expected = testArticles.filter(
            article => article.article_id !== articleId
          );
          expect(allArticles).to.eql(expected);
        });
    });
    it(`updateArticle() updates an article from the 'saes_articles' table`, () => {
      const idOfArticleToUpdate = 2;
      const newArticleData = {
        title: "New Article",
        content: "New Test Article",
        date_created: new Date(),
      };
      return ArticlesService.updateArticle(
        db,
        idOfArticleToUpdate,
        newArticleData
      )
        .then(() => ArticlesService.getById(db, idOfArticleToUpdate))
        .then(article => {
          expect(article).to.eql({
            article_id: idOfArticleToUpdate,
            ...newArticleData,
          });
        });
    });
  });

  context('Given "saes_articles" has no data', () => {
    it('getAllArticles() resolves an empty array', () => {
      return ArticlesService.getAllArticles(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
    it('insertArticle() inserts a new article and resolves the new program with a "program_id"', () => {
      this.retries(3);
      const newArticle = {
        title: "A New Article",
        content: "A new article",
        date_created: new Date(),
      };
      return ArticlesService.insertArticle(db, newArticle).then(actual => {
        expect(res => {
          expect(res.body.title).to.eql(newArticle.title);
          expect(res.body.content).to.eql(newArticle.content);
          const expected = new Date().toLocaleString();
          const actual = newDate(res.body.date_created).toLocaleString();
          expect(actual).to.eql(expected);
        });
      });
    });
  });
});

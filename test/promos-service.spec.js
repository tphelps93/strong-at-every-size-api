const PromosService = require('../src/promos/promos-service');
const knex = require('knex');
const { expect } = require('chai');

describe('Promos service object', function () {
  let db;
  let testPromos = [
    {
      promo_id: 1,
      title: 'Promo',
      content: 'A Promo',
      date_created: new Date(),
    },
    {
      promo_id: 2,
      title: 'Promo 1',
      content: 'A Promo 1',
      date_created: new Date(),
    },
    {
      promo_id: 3,
      title: 'Promo 2',
      content: 'A Promo 2',
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
    db.raw('TRUNCATE TABLE saes_promos RESTART IDENTITY CASCADE')
  );
  afterEach('clean db', () =>
    db.raw('TRUNCATE TABLE saes_promos RESTART IDENTITY CASCADE')
  );

  after('destroy db connection', () => db.destroy());

  context('Given "saes_promos" has data', () => {
    beforeEach(() => {
      return db.into('saes_promos').insert(testPromos);
    });

    it('getAllPromos() resolves all promos from "saes_promos" table', () => {
      return PromosService.getAllPromos(db).then(actual => {
        expect(actual).to.eql(testPromos);
      });
    });

    it(`getById() resolves a promos by id from 'saes_promos table`, () => {
      const thirdId = 3;
      const thirdTestPromo = testPromos[thirdId - 1];
      return PromosService.getById(db, thirdId).then(actual => {
        expect(actual).to.eql({
          promo_id: thirdId,
          title: thirdTestPromo.title,
          content: thirdTestPromo.content,
          date_created: thirdTestPromo.date_created,
        });
      });
    });

    it(`deletePromo() removes a promo by id from 'saes_promos' table`, () => {
      const promoId = 3;
      return PromosService.deletePromo(db, promoId)
        .then(() => PromosService.getAllPromos(db))
        .then(allPromos => {
          const expected = testPromos.filter(
            promo => promo.promo_id !== promoId
          );
          expect(allPromos).to.eql(expected);
        });
    });
    it(`updatePromo() updates a promo from the 'saes_promos' table`, () => {
      const idOfPromoToUpdate = 2;
      const newPromoData = {
        title: "New Promo",
        content: "A new promo",
        date_created: new Date(),
      };
      return PromosService.updatePromo(db, idOfPromoToUpdate, newPromoData)
        .then(() => PromosService.getById(db, idOfPromoToUpdate))
        .then(promo => {
          expect(promo).to.eql({
            promo_id: idOfPromoToUpdate,
            ...newPromoData,
          });
        });
    });
  });

  context('Given "saes_promos" has no data', () => {
    it('getAllPromos() resolves an empty array', () => {
      return PromosService.getAllPromos(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
    it('insertPromo() inserts a new promo and resolves the new promo with a "promo_id"', () => {
      this.retries(3);
      const newPromo = {
        title: 'New Promo',
        content: 'A new Promo',
        date_created: new Date(),
      };
      return PromosService.insertPromo(db, newPromo).then(actual => {
        expect(res => {
          expect(res.body.title).to.eql(newPromo.title);
          expect(res.body.content).to.eql(newPromo.content);
          const expected = new Date().toLocaleString();
          const actual = newDate(res.body.date_created).toLocaleString();
          expect(actual).to.eql(expected);
        });
      });
    });
  });
});

const PurchasesService = require('../src/purchases/purchases-service');
const knex = require('knex');
const { expect } = require('chai');

describe('Purchases service object', function () {
  let db;
  let testPurchases = [
    {
      purchase_id: 1,
      title: 'New Purchase',
      price: '$60',
      category: 'Apparel',
      date_purchased: new Date(),
      userid: null,
      itemid: null,
      programid: null,
    },
    {
      purchase_id: 2,
      title: 'New Purchase 1',
      price: '$50',
      category: 'Equipment',
      date_purchased: new Date(),
      userid: null,
      itemid: null,
      programid: null,
    },
    {
      purchase_id: 3,
      title: 'New Purchase 2',
      price: '$30',
      category: 'Apparel',
      date_purchased: new Date(),
      userid: null,
      itemid: null,
      programid: null,
    },
  ];

  before('setup db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
  });

  before('clean db', () =>
    db.raw('TRUNCATE TABLE user_purchases RESTART IDENTITY CASCADE')
  );
  afterEach('clean db', () =>
    db.raw('TRUNCATE TABLE user_purchases RESTART IDENTITY CASCADE')
  );

  after('destroy db connection', () => db.destroy());

  context('Given "user_purchases" has data', () => {
    beforeEach(() => {
      return db.into('user_purchases').insert(testPurchases);
    });

    it('getPurchases() resolves all purchases from "user_purchases" table', () => {
      return PurchasesService.getPurchases(db).then(actual => {
        expect(actual).to.eql(testPurchases);
      });
    });

    it(`getById() resolves a purchase by id from 'user_purchases table`, () => {
      const thirdId = 3;
      const thirdTestPurchase = testPurchases[thirdId - 1];
      return PurchasesService.getById(db, thirdId).then(actual => {
        expect(actual).to.eql({
          purchase_id: thirdId,
          title: thirdTestPurchase.title,
          price: thirdTestPurchase.price,
          category: thirdTestPurchase.category,
          date_purchased: thirdTestPurchase.date_purchased,
          userid: thirdTestPurchase.userid,
          itemid: thirdTestPurchase.itemid,
          programid: thirdTestPurchase.programid,
        });
      });
    });

    it(`deletePurchase() removes an purchase by id from 'user_purchases' table`, () => {
      const purchaseId = 3;
      return PurchasesService.deletePurchase(db, purchaseId)
        .then(() => PurchasesService.getPurchases(db))
        .then(allPurchases => {
          const expected = testPurchases.filter(
            purchase => purchase.purchase_id !== purchaseId
          );
          expect(allPurchases).to.eql(expected);
        });
    });
    it(`updatePurchase() updates a purchase from the 'user_purchases' table`, () => {
      const idOfPurchaseToUpdate = 2;
      const newPurchaseData = {
        title: 'New Purchase',
        price: '$60',
        category: 'Apparel',
        date_purchased: new Date(),
        userid: null,
        itemid: null,
        programid: null,
      };
      return PurchasesService.updatePurchase(
        db,
        idOfPurchaseToUpdate,
        newPurchaseData
      )
        .then(() => PurchasesService.getById(db, idOfPurchaseToUpdate))
        .then(purchase => {
          expect(purchase).to.eql({
            purchase_id: idOfPurchaseToUpdate,
            ...newPurchaseData,
          });
        });
    });
  });

  context('Given "user_purchases" has no data', () => {
    it('getPurchases() resolves an empty array', () => {
      return PurchasesService.getPurchases(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
    it('insertPurchase() inserts a new purchase and resolves the new purchase with a "purchase_id"', () => {
      this.retries(3);
      const newPurchase = {
        title: 'New Purchase',
        price: '$100',
        category: 'Equipment',
        date_purchased: new Date(),
        userid: null,
        itemid: null,
        programid: null,
      };
      return PurchasesService.insertPurchase(db, newPurchase).then(actual => {
        expect(res => {
          expect(res.body.title).to.eql(newPurchase.title);
          expect(res.body.price).to.eql(newPurchase.price);
          expect(res.body.category).to.eql(newPurchase.category);
          expect(res.body.userid).to.eql(newPurchase.userid);
          expect(res.body.itemid).to.eql(newPurchase.itemid);
          expect(res.body.programid).to.eql(newPurchase.programid);
          const expected = new Date().toLocaleString();
          const actual = newDate(res.body.date_purchased).toLocaleString();
          expect(actual).to.eql(expected);
        });
      });
    });
  });
});

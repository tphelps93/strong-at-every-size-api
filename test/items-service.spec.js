const ItemsService = require('../src/items/items-service');
const knex = require('knex');
const { expect } = require('chai');

describe('Items service object', function () {
  let db;
  let testItems = [
    {
      id: 1,
      title: 'SAES Tee',
      price: '$10.00',
      category: 'Apparel',
      description: 'comfortable tee',
      date_created: new Date(),
    },
    {
      id: 2,
      title: 'SAES Bag',
      price: '$20.00',
      category: 'Equipment',
      description: 'spacious bag',
      date_created: new Date(),
    },
    {
      id: 3,
      title: 'SAES Dumbbell',
      price: '$30.00',
      category: 'Equipment',
      description: '50lb dumbbell',
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
    db.raw('TRUNCATE TABLE saes_items RESTART IDENTITY CASCADE')
  );
  afterEach('clean db', () =>
    db.raw('TRUNCATE TABLE saes_items RESTART IDENTITY CASCADE')
  );

  after('destroy db connection', () => db.destroy());

  context('Given "saes_items" has data', () => {
    beforeEach(() => {
      return db.into('saes_items').insert(testItems);
    });

    it('getAllItems() resolves all items from "saes_items" table', () => {
      return ItemsService.getAllItems(db).then(actual => {
        expect(actual).to.eql(testItems);
      });
    });

    it(`getById() resolves a items by id from 'saes_items' table`, () => {
      const thirdId = 3;
      const thirdTestItem = testItems[thirdId - 1];
      return ItemsService.getById(db, thirdId).then(actual => {
        expect(actual).to.eql({
          id: thirdId,
          title: thirdTestItem.title,
          price: thirdTestItem.price,
          category: thirdTestItem.category,
          description: thirdTestItem.description,
          date_created: thirdTestItem.date_created,
        });
      });
    });

    it(`deleteItem() removes an item by id from 'saes_items' table`, () => {
      const itemId = 3;
      return ItemsService.deleteItem(db, itemId)
        .then(() => ItemsService.getAllItems(db))
        .then(allItems => {
          // copy the test articles array without the "deleted" article
          const expected = testItems.filter(item => item.id !== itemId);
          expect(allItems).to.eql(expected);
        });
    });
    it(`updateItem() updates an item from the 'saes_items' table`, () => {
      const idOfItemToUpdate = 2;
      const newItemData = {
        title: 'Updated Title',
        price: '$50.00',
        category: 'Apparel',
        description: 'Updated Item',
        date_created: new Date(),
      };
      return ItemsService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ItemsService.getById(db, idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfItemToUpdate,
            ...newItemData,
          });
        });
    });
  });

  context('Given "saes_items" has no data', () => {
    it('getAllItems() resolves an empty array', () => {
      return ItemsService.getAllItems(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
    it('insertItem() inserts a new item and resolves the new item with an "id"', () => {
      this.retries(3);
      const newItem = {
        title: 'Test Title',
        price: '$30',
        category: 'Apparel',
        description: 'New Item',
        date_created: new Date(),
      };
      return ItemsService.insertItem(db, newItem).then(actual => {
        expect(res => {
          expect(res.body.title).to.eql(newItem.title);
          expect(res.body.price).to.eql(newItem.price);
          expect(res.body.category).to.eql(newItem.category);
          expect(res.body.description).to.eql(newItem.description);
          const expected = new Date().toLocaleString();
          const actual = new Date(res.body.date_created).toLocaleString();
          expect(actual).to.eql(expected);
        });
      });
    });
  });
});

const TestimoniesService = require('../src/testimonies/testimonies-service');
const knex = require('knex');
const { expect } = require('chai');

describe('Testimonies service object', function () {
  let db;
  let testTestimonies = [
    {
      testimony_id: 1,
      photo: 'www.image.com/image',
      content: 'Testimony Content',
      date_created: new Date(),
    },
    {
        testimony_id: 2,
        photo: 'www.image.com/image/1',
        content: 'Testimony Content 1',
        date_created: new Date(),
    },
    {
        testimony_id: 3,
        photo: 'www.image.com/image/2',
        content: 'Testimony Content 2',
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
    db.raw('TRUNCATE TABLE saes_testimonies RESTART IDENTITY CASCADE')
  );
  afterEach('clean db', () =>
    db.raw('TRUNCATE TABLE saes_testimonies RESTART IDENTITY CASCADE')
  );

  after('destroy db connection', () => db.destroy());

  context('Given "saes_testimonies" has data', () => {
    beforeEach(() => {
      return db.into('saes_testimonies').insert(testTestimonies);
    });

    it('getAllTestimonies() resolves all testimonies from "saes_testimonies" table', () => {
      return TestimoniesService.getAllTestimonies(db).then(actual => {
        expect(actual).to.eql(testTestimonies);
      });
    });

    it(`getById() resolves a testimony by id from 'saes_testimonies' table`, () => {
      const thirdId = 3;
      const thirdTestTestimony = testTestimonies[thirdId - 1];
      return TestimoniesService.getById(db, thirdId).then(actual => {
        expect(actual).to.eql({
          testimony_id: thirdId,
          photo: thirdTestTestimony.photo,
          content: thirdTestTestimony.content,
          date_created: thirdTestTestimony.date_created,
        });
      });
    });

    it(`deleteTestimony() removes an testimony by id from 'saes_testimonies' table`, () => {
      const testimonyId = 3;
      return TestimoniesService.deleteTestimony(db, testimonyId)
        .then(() => TestimoniesService.getAllTestimonies(db))
        .then(allTestimonies => {
          const expected = testTestimonies.filter(
            testimony => testimony.testimony_id !== testimonyId
          );
          expect(allTestimonies).to.eql(expected);
        });
    });
    it(`updateTestimony() updates a testimony from the 'saes_testimonies' table`, () => {
      const idOfTestimonyToUpdate = 2;
      const newTestimonyData = {
        photo: 'www.image.com/new-image',
        content: 'New Content',
        date_created: new Date(),
      };
      return TestimoniesService.updateTestimony(
        db,
        idOfTestimonyToUpdate,
        newTestimonyData
      )
        .then(() => TestimoniesService.getById(db, idOfTestimonyToUpdate))
        .then(testimony => {
          expect(testimony).to.eql({
            testimony_id: idOfTestimonyToUpdate,
            ...newTestimonyData,
          });
        });
    });
  });

  context('Given "saes_testimonies" has no data', () => {
    it('getAllTestimonies() resolves an empty array', () => {
      return TestimoniesService.getAllTestimonies(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
    it('insertTestimony() inserts a new testimony and resolves the new user with a "testimony_id"', () => {
      this.retries(3);
      const newTestimony = {
        photo: 'www.image.com/new-image/1',
        content: 'New Inserted Content',
        date_created: new Date(),
      };
      return TestimoniesService.insertTestimony(db, newTestimony).then(
        actual => {
          expect(res => {
            expect(res.body.photo).to.eql(newTestimony.photo);
            expect(res.body.content).to.eql(newTestimony.content);
            const expected = new Date().toLocaleString();
            const actual = newDate(res.body.date_created).toLocaleString();
            expect(actual).to.eql(expected);
          });
        }
      );
    });
  });
});

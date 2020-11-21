const ProgramsService = require('../src/programs/programs-service');
const knex = require('knex');
const { expect } = require('chai');

describe('Promos service object', function () {
  let db;
  let testPrograms = [
    {
        program_id: 1,
        title: "New Program",
        price: "$60",
        description: "A new Program",
        date_created: new Date(),
    },
    {
        program_id: 2,
        title: "New Program 1",
        price: "$30",
        description: "A new Program",
        date_created: new Date(),
    },
    {
        program_id: 3,
        title: "New Program 2",
        price: "$50",
        description: "A new Program",
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
    db.raw('TRUNCATE TABLE saes_programs RESTART IDENTITY CASCADE')
  );
  afterEach('clean db', () =>
    db.raw('TRUNCATE TABLE saes_programs RESTART IDENTITY CASCADE')
  );

  after('destroy db connection', () => db.destroy());

  context('Given "saes_programs" has data', () => {
    beforeEach(() => {
      return db.into('saes_programs').insert(testPrograms);
    });

    it('getAllPrograms() resolves all program from "saes_programs" table', () => {
      return ProgramsService.getAllPrograms(db).then(actual => {
        expect(actual).to.eql(testPrograms);
      });
    });

    it(`getById() resolves a program by id from 'saes_programs table`, () => {
      const thirdId = 3;
      const thirdTestProgram = testPrograms[thirdId - 1];
      return ProgramsService.getById(db, thirdId).then(actual => {
        expect(actual).to.eql({
          program_id: thirdId,
          title: thirdTestProgram.title,
          price: thirdTestProgram.price,
          description: thirdTestProgram.description,
          date_created: thirdTestProgram.date_created,
        });
      });
    });

    it(`deleteProgram() removes a program by id from 'saes_programs' table`, () => {
      const programId = 3;
      return ProgramsService.deleteProgram(db, programId)
        .then(() => ProgramsService.getAllPrograms(db))
        .then(allPrograms => {
          const expected = testPrograms.filter(
            program => program.program_id !== programId
          );
          expect(allPrograms).to.eql(expected);
        });
    });
    it(`updateProgram() updates a program from the 'saes_programs' table`, () => {
      const idOfProgramToUpdate = 2;
      const newProgramData = {
        title: "New Program",
        price: '$100',
        description: "A new program",
        date_created: new Date(),
      };
      return ProgramsService.updateProgram(db, idOfProgramToUpdate, newProgramData)
        .then(() => ProgramsService.getById(db, idOfProgramToUpdate))
        .then(promo => {
          expect(promo).to.eql({
            program_id: idOfProgramToUpdate,
            ...newProgramData,
          });
        });
    });
  });

  context('Given "saes_programs" has no data', () => {
    it('getAllPrograms() resolves an empty array', () => {
      return ProgramsService.getAllPrograms(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
    it('insertProgram() inserts a new program and resolves the new program with a "program_id"', () => {
      this.retries(3);
      const newProgram = {
        title: 'New Program',
        price: '$10',
        description: 'A new Program',
        date_created: new Date(),
      };
      return ProgramsService.insertProgram(db, newProgram).then(actual => {
        expect(res => {
          expect(res.body.title).to.eql(newProgram.title);
          expect(res.body.price).to.eql(newProgram.price);
          expect(res.body.description).to.eql(newProgram.description);
          const expected = new Date().toLocaleString();
          const actual = newDate(res.body.date_created).toLocaleString();
          expect(actual).to.eql(expected);
        });
      });
    });
  });
});
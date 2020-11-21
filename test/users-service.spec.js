const UsersService = require('../src/users/users-service');
const knex = require('knex');
const { expect } = require('chai');

describe('Users service object', function () {
  let db;
  let testUsers = [
    {
      user_id: 1,
      photo:
        'https://c.files.bbci.co.uk/D6E6/production/_109241055_mediaitem109241054.jpg',
      name: 'Karen Connely',
      user_name: 'kconnely',
      password: 'mybirthday',
      email: 'speaktomgr@gmail.com',
      address: '489 Street St',
      state: 'WA',
      zip: 28780,
      date_created: new Date(),
      isadmin: false,
    },
    {
      user_id: 2,
      photo:
        'https://c.files.bbci.co.uk/D6E6/production/_109241055_mediaitem109241054.jpg',
      name: 'Sharon Sumpter',
      user_name: 'sumpter',
      password: 'mypassword',
      email: 'sharon@gmail.com',
      address: '25789 Road St',
      state: 'PA',
      zip: 90145,
      date_created: new Date(),
      isadmin: false,
    },
    {
      user_id: 3,
      photo:
        'https://c.files.bbci.co.uk/D6E6/production/_109241055_mediaitem109241054.jpg',
      name: 'Sarah Phelps',
      user_name: 'sd188',
      password: 'passwordz',
      email: 'something@gmail.com',
      address: '90210 Monticello St',
      state: 'WA',
      zip: 25439,
      date_created: new Date(),
      isadmin: true,
    },
  ];

  before('setup db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
  });

  before('clean db', () =>
    db.raw('TRUNCATE TABLE saes_users RESTART IDENTITY CASCADE')
  );
  afterEach('clean db', () =>
    db.raw('TRUNCATE TABLE saes_users RESTART IDENTITY CASCADE')
  );

  after('destroy db connection', () => db.destroy());

  context('Given "saes_users" has data', () => {
    beforeEach(() => {
      return db.into('saes_users').insert(testUsers);
    });

    it('getAllUsers() resolves all users from "saes_users" table', () => {
      return UsersService.getAllUsers(db).then(actual => {
        expect(actual).to.eql(testUsers);
      });
    });

    it(`getById() resolves a user by id from 'saes_users' table`, () => {
      const thirdId = 3;
      const thirdTestUser = testUsers[thirdId - 1];
      return UsersService.getById(db, thirdId).then(actual => {
        expect(actual).to.eql({
          user_id: thirdId,
          photo: thirdTestUser.photo,
          name: thirdTestUser.name,
          user_name: thirdTestUser.user_name,
          password: thirdTestUser.password,
          email: thirdTestUser.email,
          address: thirdTestUser.address,
          state: thirdTestUser.state,
          zip: thirdTestUser.zip,
          date_created: thirdTestUser.date_created,
          isadmin: thirdTestUser.isadmin,
        });
      });
    });

    it(`deleteUser() removes an user by id from 'saes_users' table`, () => {
      const userId = 3;
      return UsersService.deleteUser(db, userId)
        .then(() => UsersService.getAllUsers(db))
        .then(allUsers => {
          const expected = testUsers.filter(user => user.user_id !== userId);
          expect(allUsers).to.eql(expected);
        });
    });
    it(`updateUser() updates a user from the 'saes_users' table`, () => {
      const idOfUserToUpdate = 2;
      const newUserData = {
        photo: 'www.image.com/image',
        name: 'Updated Name',
        user_name: 'updatedUserName',
        password: 'newPass',
        email: 'tp@gmail.com',
        address: '255 updated st',
        state: 'WA',
        zip: 25555,
        date_created: new Date(),
        isadmin: false,
      };
      return UsersService.updateUser(db, idOfUserToUpdate, newUserData)
        .then(() => UsersService.getById(db, idOfUserToUpdate))
        .then(user => {
          expect(user).to.eql({
            user_id: idOfUserToUpdate,
            ...newUserData,
          });
        });
    });
  });

  context('Given "saes_users" has no data', () => {
    it('getAllUsers() resolves an empty array', () => {
      return UsersService.getAllUsers(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
    it('insertUser() inserts a new user and resolves the new user with a "user_id"', () => {
      this.retries(3);
      const newUser = {
        photo:
          'https://c.files.bbci.co.uk/D6E6/production/_109241055_mediaitem109241054.jpg',
        name: 'Test Name',
        user_name: 'testUserName',
        password: 'testpass',
        email: 'test@gmail.com',
        address: '90210 Test St',
        state: 'TS',
        zip: 25439,
        date_created: new Date(),
        isadmin: false,
      };
      return UsersService.insertUser(db, newUser).then(actual => {
        expect(res => {
          expect(res.body.photo).to.eql(newUser.photo);
          expect(res.body.name).to.eql(newUser.name);
          expect(res.body.user_name).to.eql(newUser.user_name);
          expect(res.body.password).to.eql(newUser.password);
          expect(res.body.email).to.eql(newUser.email);
          expect(res.body.address).to.eql(newUser.address);
          expect(res.body.state).to.eql(newUser.state);
          expect(res.body.zip).to.eql(newUser.zip);
          const expected = new Date().toLocaleString();
          const actual = newDate(res.body.date_created).toLocaleString();
          expect(actual).to.eql(expected);
          expect(res.body.isadmin).to.eql(newUser.isadmin);
        });
      });
    });
  });
});

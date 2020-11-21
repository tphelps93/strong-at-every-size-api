const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]/;
const bcrypt = require('bcryptjs');

const UsersService = {
  getAllUsers(db) {
    return db.select('*').from('saes_users');
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('saes_users')
      .returning('*')
      .then(([user]) => user);
  },
  getById(db, user_id) {
    return db.from('saes_users').select('*').where('user_id', user_id).first();
  },
  deleteUser(db, user_id) {
    return db('saes_users').where({ user_id }).delete();
  },
  updateUser(db, user_id, newUserFields) {
    return db('saes_users')
      .where({ user_id })
      .update(newUserFields)
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  hasUserWithUserName(db, user_name) {
    return db('saes_users')
      .where({ user_name })
      .first()
      .then(user => !!user);
  },
  hashedPassword(password) {
    return bcrypt.hash(password, 12);
  },

  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character';
    }
    return null;
  },
};

module.exports = UsersService;

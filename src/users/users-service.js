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
    return db('saes_users').where({ user_id }).update(newUserFields);
  },
};

module.exports = UsersService;

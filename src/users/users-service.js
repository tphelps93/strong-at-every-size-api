const UsersService = {
  getAllUsers(knex) {
    return knex.select('*').from('saes_users');
  },
  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into('saes_users')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex.from('saes_users').select('*').where('id', id).first();
  },
  deleteUser(knex, id) {
    return knex('saes_users').where({ id }).delete();
  },
  updateUser(knex, id, newUserFields) {
    return knex('saes_users').where({ id }).update(newUserFields);
  },
};

module.exports = UsersService;

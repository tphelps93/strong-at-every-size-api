const TestimoniesService = {
  getAllTestimonies(knex) {
    return knex.select('*').from('saes_testimonies');
  },
  insertTestimony(db, newTestimony) {
    return db
      .insert(newTestimony)
      .into('saes_testimonies')
      .returning('*')
      .then(([testimony]) => testimony);
  },
  getById(db, testimony_id) {
    return db.from('saes_testimonies').select('*').where('testimony_id', testimony_id).first();
  },
  deleteTestimony(db, testimony_id) {
    return db('saes_testimonies').where({ testimony_id }).delete();
  },
  updateTestimony(db, testimony_id, newTestimonyFields) {
    return db('saes_testimonies').where({ testimony_id }).update(newTestimonyFields);
  },
};

module.exports = TestimoniesService;

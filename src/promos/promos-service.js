const PromosService = {
  getAllPromos(knex) {
    return knex.select('*').from('saes_promos');
  },
  insertPromo(db, newPromo) {
    return db
      .insert(newPromo)
      .into('saes_promos')
      .returning('*')
      .then(([promo]) => promo);
  },
  getById(db, promo_id) {
    return db.from('saes_promos').select('*').where('promo_id', promo_id).first();
  },
  deletePromo(db, promo_id) {
    return db('saes_promos').where({ promo_id }).delete();
  },
  updatePromo(db, promo_id, newPromoFields) {
    return db('saes_promos').where({ promo_id }).update(newPromoFields);
  },
};

module.exports = PromosService;

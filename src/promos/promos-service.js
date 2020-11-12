const PromosService = {
  getAllPromos(knex) {
    return knex.select('*').from('saes_promos');
  },
};

module.exports = PromosService;

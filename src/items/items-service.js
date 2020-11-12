const ItemsService = {
  getAllItems(knex) {
    return knex.select('*').from('saes_items');
  },
};

module.exports = ItemsService;

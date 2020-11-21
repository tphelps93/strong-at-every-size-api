const ItemsService = {
  getAllItems(knex) {
    return knex.select('*').from('saes_items');
  },
  insertItem(db, newItem) {
    return db
      .insert(newItem)
      .into('saes_items')
      .returning('*')
      .then(([item]) => item);
  },
  getById(db, item_id) {
    return db.from('saes_items').select('*').where('item_id', item_id).first();
  },
  deleteItem(db, item_id) {
    return db('saes_items').where({ item_id }).delete();
  },
  updateItem(db, item_id, newItemFields) {
    return db('saes_items').where({ item_id }).update(newItemFields);
  },
};

module.exports = ItemsService;

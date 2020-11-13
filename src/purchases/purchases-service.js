const PurchasesService = {
  getPurchases(db) {
    return db.select('*').from('user_purchases');
  },
  insertPurchase(db, newPurchase) {
    return db
      .insert(newPurchase)
      .into('user_purchases')
      .returning('*')
      .then(([purchase]) => purchase);
  },
  getById(db, purchase_id) {
    return db.from('user_purchases').select('*').where('purchase_id', purchase_id).first();
  },
  deletePurchase(db, purchase_id) {
    return db('user_purchases').where({ purchase_id }).delete();
  },
  updatePurchase(db, purchase_id, newPurchaseFields) {
    return db('user_purchases').where({ purchase_id }).update(newPurchaseFields);
  },
};

module.exports = PurchasesService;

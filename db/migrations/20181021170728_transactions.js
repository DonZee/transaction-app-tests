
exports.up = function(knex, Promise) {
  return knex.schema.createTable('transactions', (table)=>{
    table.increments();
    table.integer('user_id')
          .references('id')
          .inTable('users')
          .index();
    table.specificType('amount', 'real');
    table.string('type');
    table.string('buisness_name');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('transactions')
};

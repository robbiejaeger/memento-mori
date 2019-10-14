
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('subscriptions', function(table) {
      table.increments('id').primary();
      table.string('google_auth_uid');
      table.text('subscription');

      table.timestamps(true, true);
    })
  ]);
};


exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('subscriptions')
  ]);
};

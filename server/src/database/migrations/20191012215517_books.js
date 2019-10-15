
exports.up = function(knex) {
  return knex.schema.createTable('books', table => {
      table.increments('id');
      table.string('name');
      table.string('genre');
      table.integer('authorId').unsigned().references('id').inTable('authors').notNullable().onDelete('cascade')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('books')
};

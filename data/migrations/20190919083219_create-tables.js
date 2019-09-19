
exports.up = function(knex) {
    return knex.schema
        .createTable('makes', tbl => {
            tbl.increments();
            tbl.string('make', 128).notNullable();
        })
        .createTable('models', tbl => {
            tbl.increments();
            tbl.string('model', 128).notNullable();
        })
        .createTable('users', tbl => {
            tbl.increments();
            tbl
                .string('username', 128)
                .notNullable()
                .unique();
            tbl.string('password', 300).notNullable();
        })
        .createTable('cars', tbl => {
            tbl.increments() 
            tbl.integer('make_id')
                .notNullable()
                .unsigned()
                .references('id') 
                .inTable('makes')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.integer('model_id')
                .notNullable()
                .unsigned()
                .references('id') 
                .inTable('models')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.integer('user_id')
                .notNullable()
                .unsigned()
                .references('id') 
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE') 
            tbl.integer('mileage') 
            tbl.string('vin', 128).unique().notNullable()
            tbl.string('status', 128)
            tbl
                .string('transmission', 128)
                .defaultTo('automatic')
        })
  
};

exports.down = function(knex) {
    return knex.schema 
        .dropTableIfExists('cars') 
        .dropTableIfExists('users')
        .dropTableIfExists('models')
        .dropTableIfExists('makes')
};

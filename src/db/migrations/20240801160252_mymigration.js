
exports.up = function(knex) {
    return knex.schema
    .createTable('critics', function (table) {
      table.increments('critic_id');
      table.string('preferred_name');
      table.string('surname');
      table.string('organization_name');
      table.timestamps(true, true);
    })
    .createTable('movies', function (table) {
        table.increments("movie_id");
        table.string("title");
        table.integer("runtime_in_minutes");
        table.enum("rating", ["G", "PG", "PG-13", "R", "NC-17", "NR"]);
        table.text("description");
        table.string("image_url");
        table.timestamps(true, true);
    })
    .createTable('theaters', function (table) {
        table.increments("theater_id");
        table.string("name");
        table.string("address_line_1");
        table.string("address_line_2");
        table.string("city");
        table.string("state");
        table.string("zip");
        table.timestamps(true, true);
      })
    .createTable('movies_theaters', function (table) {
        //table.foreign("movie_id").references("movie_id").inTable("movies");
        table.boolean("is_showing").defaultTo(false);
        //table.timestamps(true, true);
    
        table.integer("movie_id").unsigned().notNullable();
        //table.foreign('movie_id').references('movies.movie_id')
        table.foreign("movie_id").references("movie_id").inTable("movies");
    
        table.integer("theater_id").unsigned().notNullable();
        table.foreign("theater_id").references("theater_id").inTable("theaters");
      })
    .createTable('reviews', function (table) {
        table.increments("review_id");
        table.text("content");
        table.integer("score");
        table.timestamps(true, true);
    
        table.integer("critic_id").unsigned().notNullable();
        table.foreign("critic_id").references("critic_id").inTable("critics");
    
        table.integer("movie_id").unsigned().notNullable();
        table.foreign("movie_id").references("movie_id").inTable("movies");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('critics').dropTable('movies').dropTable('movies_theaters').dropTable('reviews').dropTable('theaters');
};

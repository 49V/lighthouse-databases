const helpers = require('./helpers');
const settings = require('./settings')
const name = process.argv[2];

const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

knex.select('*')
  .from('famous_people')
  .where({first_name: name})
  .orWhere({last_name: name})
  .asCallback(function(error, rows) {
    if (error) return console.error(error);
    helpers.displayResult(rows); 
    knex.destroy();
  });


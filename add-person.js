const settings = require('./settings')
const [firstName, lastName, birthdate] = process.argv.slice(2);

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

knex('famous_people').insert({
   first_name: firstName,
   last_name: lastName,
   birthdate: birthdate
}).asCallback ((error, rows) => {
  if (error) return console.error(error);
  console.log(`Successfully submitted '${firstName} ${lastName} ${birthdate}'`);
  knex.destroy();
});
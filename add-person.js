const settings = require('./settings')
const [firstName, lastName, birthdate] = process.argv.slice(2);

const knex = require('knex')({
  client: 'pg',
  connection: settings
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
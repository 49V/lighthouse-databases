const pg = require("pg");
const settings = require("./settings"); // settings.json
const name = process.argv.slice(2)
console.log(name);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const query = {
  text: 'SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1',
  values: name,
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    displayResult(result.rows);    
    client.end();
  });
});

function displayResult (rows) {
  console.log(`Found ${rows.length} person(s) by the name of ${process.argv[2]}`);
  
  rows.forEach(function(person) {
    console.log(`${person.id}: ${person.first_name} ${person.last_name}, born '${person.birthdate}'`);
  });


}


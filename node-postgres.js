const helpers = require("./helpers");
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
    helpers.displayResult(result.rows);    
    client.end();
  });
});


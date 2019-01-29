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
  let count = 1;  

  rows.forEach(function(person) {
    const formattedDate = formatDate(person.birthdate)
    console.log(`${count}: ${person.first_name} ${person.last_name}, born '${formattedDate}'`);
    count++;
  });
}

function formatDate (date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() < 9) ? '0' + (newDate.getMonth() + 1): newDate.getMonth() + 1;
  const day = (newDate.getDate() < 10) ? '0' + newDate.getDate() : newDate.getDate();
  return `${year}-${month}-${day}`
}


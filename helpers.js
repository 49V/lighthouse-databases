let formatDate = function formatDate (date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() < 9) ? '0' + (newDate.getMonth() + 1): newDate.getMonth() + 1;
  const day = (newDate.getDate() < 10) ? '0' + newDate.getDate() : newDate.getDate();
  return `${year}-${month}-${day}`
}

module.exports = {
  displayResult : function (rows) {
    console.log(`Found ${rows.length} person(s) by the name of '${process.argv[2]}'`);
    let count = 1;  

    rows.forEach(function(person) {
      const formattedDate = formatDate(person.birthdate)
      console.log(`- ${count}: ${person.first_name} ${person.last_name}, born '${formattedDate}'`);
      count++;
    });
  },

};

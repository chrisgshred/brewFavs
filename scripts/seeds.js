const db = require("../models")
const fs = require("fs");
const path = require("path");

const seedFileDir = path.join(__dirname, "../datasources/");

db.sequelize.sync({ force: true }).then(() => {
  seedBreweries().then((breweries) => {
    process.exit(0);
  }).catch(error => {
    console.log(error);
    process.exit(1);
  });
});

function seedBreweries(){
  const csv = fs.readFileSync(path.join(seedFileDir, "breweries.csv"), "utf8");
  const breweryRecords = csv.trim().split("\n").slice(1).map(parseBreweryLine);
  return db.Brewery.bulkCreate(breweryRecords);
}

function parseBreweryLine(line) {
  const [breweryId, name, city, state] = line.trim().split(',');
  return {
    breweryId,
    name,
    city,
    state: state.trim()
  }
}

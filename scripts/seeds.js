const db = require("../models")
const fs = require("fs");
const path = require("path");

const seedFileDir = path.join(__dirname, "../datasources/");

db.sequelize.sync({ force: true }).then(() => {
  seedBreweries().then((breweries) => {
    seedBeers().then(() => {
      process.exit(0);
    })
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

function seedBeers(){
  const csv = fs.readFileSync(path.join(seedFileDir, "beers.csv"), "utf8");
  const beerRecords = csv.trim().split("\n").slice(1).map(parseBeerLine);
  return db.Beer.bulkCreate(beerRecords);
}

function parseBeerLine(line) {
  const [rowNo, abv, ibu, beerId, name, style, breweryId, ounces] = line.trim().split(',');

  let abv_return;

  if (abv === "") {
    abv_return = 0;
  }
  else {
    abv_return = abv;
  }

  let ibu_return;
  
  if (ibu === "") {
    ibu_return = 0;
  }
  else {
    ibu_return = ibu;
  }

  return {rowNo, abv_return, ibu_return, beerId, name, style, breweryId, ounces}
}

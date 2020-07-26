$(document).ready(() => {
    // Getting references to our form and inputs
    const beerAddForm = $("#beerAddForm");
    const nameInput = $("#nameField");
    const styleInput = $("#styleSelect");
    const ouncesInput = $("#ouncesSelect");

    // When the form is submitted, we validate there's an email and password entered
    beerAddForm.on("submit", event => {
        event.preventDefault();
        const addData = {
            name: nameInput.val().trim(),
            style: styleInput.val().trim(),
            ounces: ouncesInput.val().trim()
        };

        // Add the beers to the search array
        $.post("/api/beer", addData).then((beers) => {
            // dynamically render beers in the results area
            // renderBeers(beers);
        }).catch(err => {
            console.log(err);
        });
    });

    // Getting references to our form and inputs
    const brewAddForm = $("#brewerySearchForm");
    const brewNameInput = $("#breweryName");
    const brewCityInput = $("#breweryCity");
    const brewStateInput = $("#breweryState");

    // When the form is submitted, we validate there's an email and password entered
    brewAddForm.on("submit", event => {
        event.preventDefault();
        const addData = {
            name: brewNameInput.val().trim(),
            city: brewCityInput.val().trim(),
            state: brewStateInput.val().trim()
        };

        // If we have an email and password we run the loginUser function and clear the form
        $.post("/api/brewery", addData).then((breweries) => {
            // dynamically render beers in the results area
            // renderBreweries(breweries);
        }).catch(err => {
            console.log(err);
        });
    });
});

$(document).ready(() => {
    // Getting references to our form and inputs
    const beerSearchForm = $("#beerSearchForm");
    const nameInput = $("#nameField");
    const styleInput = $("#styleSelect");
    const ouncesInput = $("#ouncesSelect");

    // When the form is submitted, we validate there's an email and password entered
    beerSearchForm.on("submit", event => {
        event.preventDefault();
        const searchData = {
            name: nameInput.val().trim(),
            style: styleInput.val().trim(),
            ounces: ouncesInput.val().trim()
        };

        // Add the beers to the search array
        $.get("/api/beer", searchData).then((beers, res) => {
            // console.log(beers);
            // res.render("search", res.body);
        }).catch(err => {
            console.log(err);
        });
    });

    // Getting references to our form and inputs
    const brewSearchForm = $("#brewerySearchForm");
    const brewNameInput = $("#breweryName");
    const brewCityInput = $("#breweryCity");
    const brewStateInput = $("#breweryState");

    // When the form is submitted, we validate there's an email and password entered
    brewSearchForm.on("submit", event => {
        event.preventDefault();
        const searchData = {
            name: brewNameInput.val().trim(),
            city: brewCityInput.val().trim(),
            state: brewStateInput.val().trim()
        };

        // If we have an email and password we run the loginUser function and clear the form
        $.get("/api/brewery", searchData).then((req, res) => {
            console.log(res);
            // for (let i = 0; i < dbObj.length; i++) {
            //     // Add a brewery to the brewery array
            // }
        }).catch(err => {
            console.log(err);
        });
    });
});

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}
$(document).ready(() => {
    // Getting references to our form and inputs
    const beerSearchForm = $("#beerSearchForm");
    const nameInput = $("#nameField");
    const styleInput = $("#styleSelect");
    const ouncesInput = $("#ouncesSelect");
    const listContainer = $("#listresults");

    listContainer.on("click", ".btn-fav-beer", function (event) {
        $.get("/api/user_data").then(data => {
            const userId = data.id;
            const postObj = { UserUserId: userId, BeerId: this.value };
            console.log(postObj);

            $.post("/api/beer/favorite", postObj);
        })
    });

    listContainer.on("click", ".btn-fav-brewery", function (event) {
        $.get("/api/user_data").then(data => {
            const userId = data.id;
            const postObj = { UserUserId: userId, BreweryId: event.target.value };
            console.log(postObj);

            $.post("/api/brewery/favorite", postObj);
        })
    });

    // When the form is submitted, we validate there's an email and password entered
    beerSearchForm.on("submit", event => {
        event.preventDefault();
        const searchData = {
            name: nameInput.val().trim(),
            style: styleInput.val().trim(),
            ounces: ouncesInput.val().trim()
        };

        // Add the beers to the search array
        $.get("/api/beer", searchData).then((beers) => {
            // dynamically render beers in the results area
            renderBeers(beers);
        }).catch(err => {
            console.log(err);
        });
    });

    function renderBeers(beers) {
        // dynamically render beers in the results area
        const beerHtml = beers.map(beer => {
            const { name, style, ounces, id } = beer;
            const html = `<div>
            <p> Name : ${name}</p>
            <p> Style : ${style}</p>
            <p> Ounces : ${ounces}</p>
            <button style='font-size:12px' class="btn btn-success btn-fav-beer" value="${id}">Fav <i class='fas fa-beer'></i></button>
          </div>`
            return html;
        });
        $("#listresults").html(beerHtml.join(""));
    }

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
        $.get("/api/brewery", searchData).then((breweries) => {
            // dynamically render beers in the results area
            renderBreweries(breweries);
        }).catch(err => {
            console.log(err);
        });
    });

    function renderBreweries(breweries) {
        // dynamically render breweries in the results area
        const breweryHtml = breweries.map(brewery => {
            const { name, city, state, id } = brewery;
            const html = `<div>
            <p> Name : ${name}</p>
            <p> City : ${city}</p>
            <p> State : ${state}</p>
            <button style='font-size:12px' class="btn btn-success btn-fav-brewery" value="${id}">Fav <i class='fas fa-beer'></i></button>
          </div>`
            //   console.log("brewry id " + id + "------------------");
            return html;
        });
        $("#listresults").html(breweryHtml.join(""));
    }
});



//function to convert brewery locations (city, state) to lat/lon for googlemap placement
function brewCoordinates() {
    var NodeGeocoder = require('node-geocoder');
    
    var geocoder = NodeGeocoder({
    provider: 'opencage',
    apiKey: 'c8c4ea1b63104d4ea43ab848452d9538'
    });
    
    // Using callback
    geocoder.geocode('37.4396, -122.1864', function (err, res) {
    console.log(res);
    });
    geocoder.geocode('29 champs elysée paris', function (err, res) {
    console.log(res);
    });
    };
    
    
    //google map function to render results on map
    var map;
    function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: new google.maps.LatLng(41.2565, -95.9345),
    mapTypeId: 'terrain'
    });
    
    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');
    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    }
    
    // Loop through the results array and place a marker for each
    // set of coordinates.
    window.eqfeed_callback = function (results) {
    for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1], coords[0]);
    var marker = new google.maps.Marker({
    position: latLng,
    map: map
    });
    }
    }
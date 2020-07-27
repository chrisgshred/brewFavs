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
            const postObj = { UserUserId: userId, BreweryId: this.value };
            console.log(postObj);

            $.post("/api/brewery/favorite", postObj);
        })
    });

    listContainer.on("click", ".btn-find-brewery", function (event) {
        const searchData = {
            name: "",
            city: "",
            state: "",
            id: this.value
        }

        $.get("/api/brewery", searchData).then((breweries) => {
            // dynamically render beers in the results area
            const name = breweries[0].name;
            const city = breweries[0].city;
            const state = breweries[0].state;

            // console.log(`${name} ${city} ${state} USA`);

            const request = {
                query: `${name} ${city} ${state} USA`,
                fields: ["name", "geometry"]
            };
            service = new google.maps.places.PlacesService(map);
            service.findPlaceFromQuery(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                    map.setCenter(results[0].geometry.location);
                }
            });
        }).catch(err => {
            console.log(err);
        });
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
            const html = `<div class="each-item">
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
            state: brewStateInput.val().trim(),
            id: ""
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
            const html = `<div class="each-item">
            <p> Name : ${name}</p>
            <p> City : ${city}</p>
            <p> State : ${state}</p>
            <button style='font-size:12px' class="btn btn-success btn-fav-brewery" value="${id}">Fav <i class='fas fa-beer'></i></button>
            <button style='font-size:12px' class="btn btn-success btn-find-brewery" value="${id}">Find</button>
          </div>`
            //   console.log("brewry id " + id + "------------------");
            return html;
        });
        $("#listresults").html(breweryHtml.join(""));
    }
});


// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
let infowindow;
initMap();
function initMap() {
    const sydney = new google.maps.LatLng(-33.867, 151.195);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: sydney,
        zoom: 15
    });
    const request = {
        query: "Hess Brewing San Diego CA USA",
        fields: ["name", "geometry"]
    };
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
        }
    });
}

function createMarker(place) {
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name);
        infowindow.open(map);
    });
}
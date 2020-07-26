$(document).ready(() => {
    // Getting references to our form and inputs
    const beerSearchForm = $("#beerSearchForm");
    const nameInput = $("#nameField");
    const styleInput = $("#styleSelect");
    const ouncesInput = $("#ouncesSelect");

    $.get("/api/user_data").then(data => {
        // $(".member-name").text(data.email);
        const userId = data.id;

        $.get("/api/beer/favorite/" + userId).then((beers) => {
            // dynamically render beers in the results area
            renderBeers(beers);
        }).catch(err => {
            console.log(err);
        });

        // If we have an email and password we run the loginUser function and clear the form
        $.get("/api/brewery/favorite/"+userId).then((breweries) => {
            // dynamically render beers in the results area
            renderBreweries(breweries);
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
            return html;
        });
        $("#breweryList").html(breweryHtml.join(""));
    }
});

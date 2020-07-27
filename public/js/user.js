$(document).ready(() => {
    const beerListContainer = $("#listresults");
    const breweryListContainer = $("#breweryList");

    beerListContainer.on("click", ".btn-fav-beer", function (event) {
        $.get("/api/user_data").then(data => {
            const userId = data.id;
            const beerId = this.value;

            $.ajax({ url: `/api/beer/favorite/${userId}/${beerId}`, method: "DELETE" }).then(() => {
                window.location.reload(true);
            })
                .catch(function (err) {
                    console.log(err);
                });
        })
    });

    breweryListContainer.on("click", ".btn-fav-brewery", function (event) {
        $.get("/api/user_data").then(data => {
            const userId = data.id;
            const breweryId = this.value;

            $.ajax({ url: `/api/brewery/favorite/${userId}/${breweryId}`, method: "DELETE" }).then(() => {
                window.location.reload(true);
            })
                .catch(function (err) {
                    console.log(err);
                });
        })
    });

    $.get("/api/user_data").then(data => {
        const userId = data.id;
        const email = data.email;
        $(".email").text(email)


        $.get("/api/beer/favorite/" + userId).then((beers) => {
            renderBeers(beers);
        }).catch(err => {
            console.log(err);
        });


        $.get("/api/brewery/favorite/" + userId).then((breweries) => {
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
            <button style='font-size:12px' class="btn btn-danger btn-fav-beer" value="${id}">Delete <i class='fas fa-beer'></i></button>
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
            <button style='font-size:12px' class="btn btn-danger btn-fav-brewery" value="${id}">Delete <i class='fas fa-beer'></i></button>
          </div>`
            return html;
        });
        $("#breweryList").html(breweryHtml.join(""));
    }
});
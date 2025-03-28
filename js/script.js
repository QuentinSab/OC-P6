const api_url = "http://localhost:8000/api/v1/";

const best_movies_query = "titles/?sort_by=-imdb_score";
const genre_list_query = "genres/";

document.addEventListener("DOMContentLoaded", function () {

    fetch(api_url + best_movies_query)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur HTTP : " + response.status);
            }
            return response.json();
        })

        .then(data => {
            let h3 = document.querySelector(".best-movie-div h3");
            h3.textContent = data.results[0].title;

            let best_movie_image = document.getElementById("best-movie-poster");
            best_movie_image.setAttribute("src", data.results[0].image_url);
        })

        .catch(error => {
            console.error('Erreur :', error);
        });

});